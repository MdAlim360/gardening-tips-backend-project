import { Schema } from "mongoose";

export type TVerifyUser = {


    user: string;
    name: string;
    email: string;
    nid: number;
    isDeleted: boolean;
    transaction: string;
}