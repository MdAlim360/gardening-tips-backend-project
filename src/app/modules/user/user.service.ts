import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { Admin } from "../admin/admin.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

// const createUserIntoDb = async (payload: TUser) => {

//     try {
//         if (payload.role === 'admin') {
//             const newAdmin = await Admin.create(payload);
//             if (!newAdmin) {
//                 throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Admin');
//             }
//             return newAdmin;
//         }
//         else {
//             const newUser = await User.create(payload);
//             if (!newUser) {
//                 throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Admin');
//             }
//             return newUser;
//         }
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//         throw new Error(error)
//     }
// }
const createUserIntoDb = async (payload: TUser) => {

    try {


        const newUser = await User.create(payload);
        if (!newUser) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Admin');
        }
        return newUser;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error)
    }
}

const getAllUsersFromDb = async () => {
    const user = await User.find();
    return user;
}

const getSingleUserFromDb = async (id: string) => {
    const result = await User.findById(id);
    return result;
}

const updateUsersIntoDb = async (id: string, payload: any) => {
    try {
        const result = await User.findByIdAndUpdate(
            id,
            payload,
            {
                new: true,

            }
        )
        return result;


    } catch (error: any) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update user!');
    }
}

export const userService = {
    createUserIntoDb,
    getAllUsersFromDb,
    updateUsersIntoDb,
    getSingleUserFromDb
}