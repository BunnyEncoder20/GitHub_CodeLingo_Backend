import { z } from "zod";

const zod_RawUserData = z.object({
    username: z.string().min(5, "username of atleast 5 characters is required").trim(),
    email: z.string().email("invalid email").trim(),
    password: z.string().min(6, "password must be at least 6 characters long"),
    isVerified: z.boolean().optional().default(false),
    lang_studying: z.array(z.string()),
    isAcceptingNotifications: z.boolean().optional().default(true),
})

const zod_UserInputSchema = z.object({
    username: z.string().min(5, "username of atleast 5 characters is required").trim(),
    email: z.string().email("invalid email").trim(),
    password: z.string().min(6, "password must be at least 6 characters long"),
    avatar_url: z.string().url().optional(),  // Optional cloudinary URL
    isVerified: z.boolean().optional().default(false),
    lang_studying: z.array(z.string()),
    isAcceptingNotifications: z.boolean().optional().default(true),
    refreshToken: z.string().optional(),
});

// Infer the TypeScript type from the Zod schema
type zod_RawUserType = z.infer<typeof zod_RawUserData>
type zod_UserInputType = z.infer<typeof zod_UserInputSchema>;

export { 
    zod_RawUserData,
    zod_RawUserType,
    zod_UserInputSchema,
    zod_UserInputType
}