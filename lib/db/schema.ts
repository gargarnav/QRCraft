import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
    id: text("id").primaryKey(), // Matches Clerk userId
    email: text("email").notNull().unique(),
    fullName: text("full_name"),
    avatarUrl: text("avatar_url"),
    plan: text("plan").default("free"), // 'free' | 'pro' | 'enterprise'
    qrCodesCount: integer("qr_codes_count").default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
