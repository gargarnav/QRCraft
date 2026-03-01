import { auth } from "@clerk/nextjs/server";
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

    const profile = await db.query.profiles.findFirst({
        where: eq(profiles.id, userId),
    });

    if (!profile) {
        // Show a loading skeleton while profile is being handled by webhook
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-300">
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p>Setting up your profile...</p>
            </div>
        );
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
