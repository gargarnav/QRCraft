import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { profiles, qrCodes } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { PLANS, PlanType } from "@/lib/plans";

export async function POST(req: NextRequest) {
    console.log("QR Create API called");
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("User ID:", userId);

    try {
        const body = await req.json();
        console.log("Parsed body received in API:", body);
        const { name, qrType, type, data, destinationUrl, config } = body;

        // Validation
        if (!name || !qrType || !type || !data) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Fetch user profile
        let [profile] = await db
            .select()
            .from(profiles)
            .where(eq(profiles.id, userId))
            .limit(1);

        if (!profile) {
            console.log("Profile not found, creating a new one for", userId);
            const user = await currentUser();
            const email = user?.emailAddresses?.[0]?.emailAddress || '';
            const fullName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : '';

            [profile] = await db.insert(profiles).values({
                id: userId,
                email: email,
                fullName: fullName,
                plan: "free",
                qrCodesCount: 0,
            }).returning();
        }
        console.log("Profile:", profile);

        const planName = (profile.plan || 'free') as PlanType;
        const limits = PLANS[planName].limits;

        // Dynamic checks
        if (type === 'dynamic' && limits.dynamicQRCodes === 0) {
            return NextResponse.json({ error: "DYNAMIC_NOT_ALLOWED" }, { status: 403 });
        }

        if (type === 'dynamic' && limits.dynamicQRCodes !== Infinity) {
            const [result] = await db
                .select({ count: sql<number>`count(*)` })
                .from(qrCodes)
                .where(sql`${qrCodes.userId} = ${userId} AND ${qrCodes.type} = 'dynamic'`);

            if (Number(result.count) >= limits.dynamicQRCodes) {
                return NextResponse.json({ error: "LIMIT_REACHED", message: `${PLANS[planName].name} plan allows a maximum of ${limits.dynamicQRCodes} dynamic QR codes.` }, { status: 403 });
            }
        }

        // Static limits logic
        if (type === 'static' && limits.staticQRCodes !== Infinity) {
            if (planName === 'free') {
                // Lifetime check for Free
                const currentCount = profile.qrCodesCount ?? 0;
                if (currentCount >= limits.staticQRCodes) {
                    return NextResponse.json({ error: "LIMIT_REACHED", message: `${PLANS[planName].name} plan allows a maximum of ${limits.staticQRCodes} QR codes.` }, { status: 403 });
                }
            } else {
                // Monthly execution limits for Maker
                const startOfMonth = new Date();
                startOfMonth.setDate(1);
                startOfMonth.setHours(0, 0, 0, 0);

                const [result] = await db
                    .select({ count: sql<number>`count(*)` })
                    .from(qrCodes)
                    .where(sql`${qrCodes.userId} = ${userId} AND ${qrCodes.type} = 'static' AND ${qrCodes.createdAt} >= ${startOfMonth}`);

                if (Number(result.count) >= limits.staticQRCodes) {
                    return NextResponse.json({ error: "LIMIT_REACHED", message: `${PLANS[planName].name} plan allows a maximum of ${limits.staticQRCodes} static QR codes per month.` }, { status: 403 });
                }
            }
        }

        // Feature Limits
        if (config?.logo && !limits.logoUpload) {
            return NextResponse.json({ error: "LOGO_NOT_ALLOWED" }, { status: 403 });
        }
        // Pro and Enterprise plans have unlimited generation.

        const id = nanoid();
        const shortCode = type === "dynamic" ? nanoid(6) : null;

        const insertData = {
            id,
            userId,
            name,
            qrType,
            type,
            data,
            destinationUrl: destinationUrl || null,
            config: config || null,
            shortCode,
        };
        console.log("Inserting QR Data:", insertData);

        // Insert into qrCodes table
        const [newQR] = await db.insert(qrCodes).values(insertData).returning();

        // Update profiles table safely
        await db.update(profiles)
            .set({ qrCodesCount: sql`${profiles.qrCodesCount} + 1`, updatedAt: new Date() })
            .where(eq(profiles.id, userId));

        return NextResponse.json(newQR, { status: 201 });

    } catch (error: any) {
        console.error("Full error creating QR code:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
