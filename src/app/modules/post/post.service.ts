import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { TPost } from "./post.interface";
import { User } from "../user/user.model";
import Post from "./post.model";
import QueryBuilder from "../../builder/queryBuilder";


const createPostIntoDb = async (payload: TPost) => {

    const existUser = await User.findById(payload.user)

    if (!existUser) {
        throw new AppError(httpStatus.BAD_REQUEST, 'invalid user')
    }


    const newPost = await Post.create(payload)
    return newPost

}

// const getAllPostFromDb = async () => {
//     const result = await Post.find()
//         .populate('user')
//     if (result.length === 0) {
//         throw new AppError(httpStatus.BAD_REQUEST, 'Data is not found!')
//     }
//     return result;
// }

const getAllPostFromDb = async (query: Record<string, unknown>) => {

    const productQuery = new QueryBuilder(
        Post.find(),
        query,
    )
        // .search(roomSearchableFields)
        .filter()
        .sort()

    const result = await productQuery.modelQuery;


    return {
        result,
    }

}
// const getMyPostFromDb = async (id: string) => {
//     // const user = await User.find({ email: email })
//     // const { _id } = user[0]
//     console.log(id);

//     const result = await Post.find({ user: id })
//     if (result.length === 0) {
//         throw new AppError(httpStatus.BAD_REQUEST, 'Data is not found!')
//     }
//     return result;
// }

const getMyPostFromDb = async (id: string, query: Record<string, unknown>) => {
    const productQuery = new QueryBuilder(
        Post.find({ user: id }), // Filter posts by user ID
        query,
    )
        .filter() // Apply filters
        .sort(); // Apply sorting

    const result = await productQuery.modelQuery;

    if (result.length === 0) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Data is not found!');
    }
    return result;
};

const updatePostIntoDb = async (id: string, payload: any) => {
    try {
        const result = await Post.findByIdAndUpdate(
            id,
            payload,
            {
                new: true,
                runValidators: true
            }
        )
        return result;

    } catch (error: any) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update post!');
    }
}

const getSinglePostFromDb = async (id: string) => {
    const result = await Post.findById(id);
    return result;
}

const deletePostFromDb = async (id: string) => {
    const result = await Post.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true,
        },
    );
    return result;
};

export const postService = {
    createPostIntoDb,
    getAllPostFromDb,
    getMyPostFromDb,
    updatePostIntoDb,
    deletePostFromDb,
    getSinglePostFromDb
};
