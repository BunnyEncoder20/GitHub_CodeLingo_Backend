import { z } from "zod";

const zod_UserInputSchema = z.object({
    username: z.string().min(1, "username is required").trim(),
    email: z.string().email("please provide a valid email").trim(),
    password: z.string().min(6, "password must be at least 6 characters long"),
    avatar_url: z.string().url().optional(),  // Optional cloudinary URL
    isVerified: z.boolean().optional().default(false),
    lang_studying: z.array(z.string()),
    isAcceptingNotifications: z.boolean().optional().default(true),
    refreshToken: z.string().optional(),
});

// Infer the TypeScript type from the Zod schema
type zod_UserInputType = z.infer<typeof zod_UserInputSchema>;

export { 
    zod_UserInputSchema,
    zod_UserInputType
}