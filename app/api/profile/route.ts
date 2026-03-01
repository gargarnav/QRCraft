import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
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
