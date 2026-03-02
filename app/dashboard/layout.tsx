import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = await auth();

    if (!userId) {
        redirect("/auth/login");
    }

    let profile = await db.query.profiles.findFirst({
        where: eq(profiles.id, userId),
    });

    if (!profile) {
        console.log("Profile not found in layout, attempting inline creation");
        try {
            const user = await currentUser();
            const email = user?.emailAddresses?.[0]?.emailAddress || '';
            const fullName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : '';

            [profile] = await db.insert(profiles).values({
                id: userId,
                email: email,
                fullName: fullName || null,
                plan: "free",
                qrCodesCount: 0,
            }).returning();
        } catch (error) {
            console.error("Error creating inline profile:", error);
            // Even if it fails, don't block the UI forever.
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Navigation / Header can be injected here based on design */}
            <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
                {children}
            </main>
        </div>
    );
}
