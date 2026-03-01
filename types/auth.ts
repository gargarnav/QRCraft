import { z } from "zod";

export const ProfileUpdateSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters").optional(),
    avatarUrl: z.string().url("Must be a valid URL").optional(),
});

export type ProfileUpdateInput = z.infer<typeof ProfileUpdateSchema>;
