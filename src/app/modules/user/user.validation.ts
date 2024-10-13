import { z } from 'zod';
const userValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        phone: z.string(),
        address: z.string().max(50),
        role: z.enum(['user', 'admin']),
        picture: z.string().optional(), // Optional string for picture URL
        coverPhoto: z.string().optional(), // Optional string for cover photo URL
        followers: z.array(z.string()).optional(), // Optional array of follower IDs (strings)
        following: z.array(z.string()).optional(), // Optional array of following IDs (strings)
        status: z.string(), // Can be further refined to match specific status values if needed

        verifiedCode: z.number(),
        isBlocked: z.boolean(),
        isDeleted: z.boolean(),
        _id: z.string().optional(),
    })
})

export const userValidation = {
    userValidationSchema
}