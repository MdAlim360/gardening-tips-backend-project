import { z } from "zod";

export const postValidationSchema = z.object({
    body: z.object({
        post: z.string().min(1, "Post content is required"),
        picture: z.string().min(1, "Picture is required"),
        tag: z.enum(['Basic', 'Premium']),
        category: z.string().min(1, "Category is required"),
        // upvote: z.number().min(0).optional(), // Optional as it has default value
        upvote: z.array(
            z.object({
                userId: z.string().min(1, "Name is required"),
                upvote: z.number()
            })
        ).optional(),
        // downvote: z.number().min(0).optional(), // Optional as it has default value
        downvote: z.array(
            z.object({
                userId: z.string().min(1, "Name is required"),
                downvote: z.number()
            })
        ).optional(),
        comments: z.array(
            z.object({
                name: z.string().min(1, "Name is required"),
                comment: z.string().min(1, "Comment is required")
            })
        ).optional(),
        favorite: z.array(z.string()).optional(),
        isDeleted: z.boolean().optional(), // Optional as it has default value
        user: z.string().nonempty("User is required"),

    })

});

export const postValidation = {
    postValidationSchema
}
