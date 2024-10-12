import httpStatus from "http-status";
import AppError from "../../errors/appError";

import { Slot } from "../slots/slot.model";
import { Room } from "../room/room.model";
import { User } from "../user/user.model";
import uniqid from 'uniqid';
import { initialPayment } from "../payment/payment.utils";
import VerifyUser from "./verifyUser.model";
import { TVerifyUser } from "./verifyUser.interface";



const createVerifyUserIntoDb = async (payload: TVerifyUser) => {
    const { name, email, nid, user } = payload;
    const existUser = await User.findById(user)

    if (!existUser) {
        throw new AppError(httpStatus.BAD_REQUEST, 'invalid user')
    }



    // Create new booking

    const transactionId = uniqid();
    const newVerifyUser = await VerifyUser.create({

        name: name,
        email: email,
        nid: nid,
        user: user,
        transactionId: transactionId,

    })
    // console.log('bb', newBooking);
    // console.log('ii', transactionId);
    // console.log(newBooking._id.toString());

    //payment
    const paymentData = {
        id: newVerifyUser._id.toString(),
        user: user,
        transactionId: transactionId,
        customerName: existUser.name,
        customerEmail: existUser.email,
        customerPhone: "018273839",
        totalAmount: 100,
    }
    // console.log(paymentData);



    const paymentSession = await initialPayment(paymentData);
    console.log(paymentSession);
    // if (paymentSession.result == "true") {
    //     // Mark slots as booked
    //     await Slot.updateMany(
    //         { _id: { $in: slots } },
    //         { isBooked: true }
    //     );
    // }
    return paymentSession;
};

// const getAllBookingsFromDb = async () => {
//     const result = await Booking.find()
//         .populate('slots')
//         .populate('room')
//         .populate('user')
//     if (result.length === 0) {
//         throw new AppError(httpStatus.BAD_REQUEST, 'Data is not found!')
//     }
//     return result;
// }
// const getMyBookingsFromDb = async (email: string) => {
//     const user = await User.find({ email: email })
//     const { _id } = user[0]


//     const result = await Booking.find({ user: _id })
//         .populate('slots')
//         .populate('room')

//     if (result.length === 0) {
//         throw new AppError(httpStatus.BAD_REQUEST, 'Data is not found!')
//     }
//     return result;
// }

// const updateBookingsIntoDb = async (id: string, payload: any) => {
//     try {
//         const result = await Booking.findByIdAndUpdate(
//             id,
//             payload,
//             {
//                 new: true,
//                 runValidators: true
//             }
//         )
//         return result;

//     } catch (error: any) {
//         throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update room!');
//     }
// }

// const deleteBookingFromDb = async (id: string) => {
//     const result = await Booking.findByIdAndUpdate(
//         id,
//         { isDeleted: true },
//         {
//             new: true,
//         },
//     );
//     return result;
// };

export const verifyUserService = {
    createVerifyUserIntoDb,
    // createBookingIntoDb,
    // getAllBookingsFromDb,
    // getMyBookingsFromDb,
    // updateBookingsIntoDb,
    // deleteBookingFromDb
};
