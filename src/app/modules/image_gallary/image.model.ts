import { Schema, model } from "mongoose";
import { TImage_gallary } from "./image.interface";

const postSchema = new Schema<TImage_gallary>({
    title: { type: String, required: true },

    price: [{ type: Number }],

    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

const Image_gallary = model<TImage_gallary>("Image_gallary", postSchema);

export default Image_gallary;