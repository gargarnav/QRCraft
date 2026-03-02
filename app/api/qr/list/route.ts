import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { qrCodes } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const userQRCodes = await db
            .select()
            .from(qrCodes)
            .where(eq(qrCodes.userId, userId))
            .orderBy(desc(qrCodes.createdAt));

        return NextResponse.json(userQRCodes, { status: 200 });
    } catch (error) {
        console.error("Error fetching QR codes:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
