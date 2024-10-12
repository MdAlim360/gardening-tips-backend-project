import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = catchAsync(async (req, res) => {
    const result = await postService.createPostIntoDb(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Post created successfully",
        data: result
    })
});
const getAllPost = catchAsync(async (req, res) => {
    const result = await postService.getAllPostFromDb(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All post retrieved successfully",
        data: result
    })
})
const getMyPost = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params

    const result = await postService.getMyPostFromDb(id, req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My posts are retrieved successfully",
        data: result
    });
});

const getSinglePost = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await postService.getSinglePostFromDb(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Post is retrieved successfully',
        data: result,
    });
})

const updatePost = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    const result = await postService.updatePostIntoDb(id, updateData);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Post update successfully',
        data: result,
    })
})

const deletePost = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await postService.deletePostFromDb(id);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking is deleted successfully',
        data: result,
    })
})

export const postController = {
    createPost,
    getAllPost,
    getMyPost,
    updatePost,
    deletePost,
    getSinglePost
}