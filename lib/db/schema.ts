import { pgTable, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
    id: text("id").primaryKey(), // Matches Clerk userId
    email: text("email").notNull().unique(),
    fullName: text("full_name"),
    avatarUrl: text("avatar_url"),
    plan: text("plan").notNull().default("free"), // 'free' | 'maker' | 'pro' | 'enterprise'
    qrCodesCount: integer("qr_codes_count").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const qrCodes = pgTable("qr_codes", {
    id: text("id").primaryKey(), // nanoid
    userId: text("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
    type: text("type").notNull(), // 'static' | 'dynamic'
    qrType: text("qr_type").notNull(), // 'url' | 'text' | 'wifi' | 'email' | 'phone'
    name: text("name").notNull().default("Untitled"),
    data: text("data").notNull(),
    shortCode: text("short_code").unique(),
    destinationUrl: text("destination_url"),
    config: jsonb("config"),
    scans: integer("scans").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const scanEvents = pgTable("scan_events", {
    id: text("id").primaryKey(), // nanoid
    qrId: text("qr_id").notNull().references(() => qrCodes.id, { onDelete: "cascade" }),
    scannedAt: timestamp("scanned_at").defaultNow(),
    country: text("country"),
    city: text("city"),
    device: text("device"), // 'mobile' | 'desktop' | 'tablet'
    os: text("os"),
    ip: text("ip"),
});

export const subscriptions = pgTable("subscriptions", {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
    plan: text("plan").notNull(), // 'free' | 'maker' | 'pro' | 'enterprise'
    status: text("status").notNull(), // 'active' | 'cancelled' | 'past_due'
    paymentProvider: text("payment_provider").notNull(), // 'razorpay'
    providerSubscriptionId: text("provider_subscription_id").notNull(),
    currentPeriodEnd: timestamp("current_period_end"),
    createdAt: timestamp("created_at").defaultNow(),
});
