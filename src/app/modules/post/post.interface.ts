import { Schema } from "mongoose";

export type TPost = {
    post: String;
    picture: String;
    user: Schema.Types.ObjectId;
    tag: 'Basic' | 'Premium';
    category: String;
    upvote: Number;
    downvote: Number;
    comments: String[];
    favorite: String[];
    isDeleted: boolean;

}