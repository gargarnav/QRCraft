import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ProfileUpdateSchema } from "@/types/auth";

export async function GET() {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await db.query.profiles.findFirst({
        where: eq(profiles.id, userId),
    });

    if (!profile) {
        return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(profile);
}

export async function PATCH(req: Request) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const validatedData = ProfileUpdateSchema.parse(body);

        const updatedProfile = await db.update(profiles)
            .set({
                fullName: validatedData.fullName ?? null,
                avatarUrl: validatedData.avatarUrl ?? null,
                updatedAt: new Date()
            })
            .where(eq(profiles.id, userId))
            .returning();

        return NextResponse.json(updatedProfile[0]);
    } catch (error) {
        return NextResponse.json({ error: "Invalid data", details: error }, { status: 400 });
    }
}

export async function POST() {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const user = await currentUser();
        const email = user?.emailAddresses?.[0]?.emailAddress || '';
        const fullName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : '';

        const existingProfile = await db.query.profiles.findFirst({
            where: eq(profiles.id, userId),
        });

        if (existingProfile) {
            return NextResponse.json(existingProfile, { status: 200 });
        }

        const [newProfile] = await db.insert(profiles).values({
            id: userId,
            email: email,
            fullName: fullName || null,
            avatarUrl: user?.imageUrl || null,
            plan: "free",
            qrCodesCount: 0,
        }).returning();

        return NextResponse.json(newProfile, { status: 201 });
    } catch (error) {
        console.error("Failed to POST create profile", error);
        return NextResponse.json({ error: "Failed to create profile", details: error }, { status: 500 });
    }
}

