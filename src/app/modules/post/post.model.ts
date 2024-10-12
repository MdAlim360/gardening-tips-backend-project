import { Schema, model } from "mongoose";
import { TPost } from "./post.interface";

const postSchema = new Schema<TPost>({
    post: { type: String, required: true },
    picture: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tag: { type: String, enum: ['Basic', 'Premium'], required: true },
    category: { type: String, required: true },
    // upvote: { type: Number, default: 0 },
    upvote: {
        type: [
            {
                userId: { type: String, required: true },
                upvote: { type: Number, required: true }
            }
        ],
        default: 0
    },
    favorite: [{ type: String }],
    downvote: {
        type: [
            {
                userId: { type: String, required: true },
                downvote: { type: Number, required: true }
            }
        ],
        default: 0
    },
    // downvote: { type: Number, default: 0 },
    comments: {
        type: [
            {
                name: { type: String, required: true },
                comment: { type: String, required: true }
            }
        ],
        default: []
    },

    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

const Post = model<TPost>("Post", postSchema);

export default Post;