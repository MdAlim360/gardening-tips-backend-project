import { Schema } from "mongoose";
import { TVerifyUser } from "./verifyUser.interface";
import { model } from "mongoose";

// Create the schema for booking
const VerifyUserSchema: Schema = new Schema<TVerifyUser>({
    user: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    nid: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    transaction: {
        type: String,

    }
}, { timestamps: true });  // Add timestamps if you want to track createdAt and updatedAt

// Create the model from the schema
const VerifyUser = model<TVerifyUser>('VerifyUser', VerifyUserSchema);

export default VerifyUser;