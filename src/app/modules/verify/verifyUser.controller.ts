import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import { verifyUserService } from "./verifyUser.service";

const createVerifyUser = catchAsync(async (req, res) => {
    const result = await verifyUserService.createVerifyUserIntoDb(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "VerifyUser created successfully",
        data: result
    })
});
// const getAllBookings = catchAsync(async (req, res) => {
//     const result = await bookingService.getAllBookingsFromDb();
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "All bookings retrieved successfully",
//         data: result
//     })
// })
// const getMyBookings = catchAsync(async (req, res) => {

//     const email = req.user.userId
//     const result = await bookingService.getMyBookingsFromDb(email);
//     // console.log(email);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "My bookings are retrieved successfully",
//         data: result
//     })
// })
// const updateBookings = catchAsync(async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const updateData = req.body;
//     const result = await bookingService.updateBookingsIntoDb(id, updateData);


//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Booking update successfully',
//         data: result,
//     })
// })

// const deleteBooking = catchAsync(async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const result = await bookingService.deleteBookingFromDb(id);


//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Booking is deleted successfully',
//         data: result,
//     })
// })

export const verifyUserController = {
    createVerifyUser,

}