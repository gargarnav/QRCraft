import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { qrCodes, scanEvents } from "@/lib/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { nanoid } from "nanoid";

async function hashIp(ip: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(ip);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ shortCode: string }> }
) {
    const { shortCode } = await params;

    // 2. Query qrCodes
    const [foundQR] = await db
        .select()
        .from(qrCodes)
        .where(and(eq(qrCodes.shortCode, shortCode), eq(qrCodes.type, "dynamic")))
        .limit(1);

    // 3. Not found
    if (!foundQR) {
        return NextResponse.json({ error: "QR code not found" }, { status: 404 });
    }

    // 4. Missing destination
    if (!foundQR.destinationUrl) {
        return NextResponse.json({ error: "No destination configured" }, { status: 400 });
    }

    // 5. Build analytics from headers
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : null;
    const ua = request.headers.get("user-agent") || "";

    let device = "desktop";
    if (ua.includes("Mobile") || ua.includes("Android")) {
        device = "mobile";
    } else if (ua.includes("iPad") || ua.includes("Tablet")) {
        device = "tablet";
    }

    let os = "Unknown";
    if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("Windows")) os = "Windows";
    else if (ua.includes("Macintosh")) os = "Mac";
    else if (ua.includes("Linux")) os = "Linux";

    // 6. Geo-IP lookup
    let country: string | null = null;
    let city: string | null = null;
    if (ip) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000);

            const geoRes = await fetch(`https://ipapi.co/${ip}/json/`, {
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (geoRes.ok) {
                const geoData = await geoRes.json();
                country = geoData.country_name || null;
                city = geoData.city || null;
            }
        } catch (error) {
            // Silently ignore to avoid blocking redirect
        }
    }

    const hashedIp = ip ? await hashIp(ip) : null;

    // 7 & 8. Concurrently execute insertions and updates
    await Promise.all([
        db.insert(scanEvents).values({
            id: nanoid(),
            qrId: foundQR.id,
            country,
            city,
            device,
            os,
            ip: hashedIp,
        }),
        db.update(qrCodes)
            .set({ scans: sql`${qrCodes.scans} + 1`, updatedAt: new Date() })
            .where(eq(qrCodes.id, foundQR.id)),
    ]);

    // 9. Redirect
    return NextResponse.redirect(foundQR.destinationUrl, { status: 302 });
}
