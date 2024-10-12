import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import { imageService } from "./image.service";

const createImage = catchAsync(async (req, res) => {
    const result = await imageService.createImageIntoDb(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Image created successfully",
        data: result
    })
});
const getAllImage = catchAsync(async (req, res) => {
    const result = await imageService.getAllImageFromDb(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All image retrieved successfully",
        data: result
    })
})


export const imageController = {
    createImage,
    getAllImage,

}