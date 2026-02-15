import z from "zod";

export const createPostSchema = z.object({
    postContent: z
        .string()
        .min(4, "My My ... You can write a bet longer job title 😉"),
    status: z.string().min(1, "Status is required"),
});
export type CreatePostFormData = z.infer<typeof createPostSchema>;

export const updateProfileSchema = z.object({
    displayName: z.string().min(1, "Display name is required"),
    photoURL: z
        .string()
        .url("Please enter a valid URL")
        .optional()
        .or(z.literal("")),
});
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

export const authSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
});

export type AuthFormData = z.infer<typeof authSchema>;
