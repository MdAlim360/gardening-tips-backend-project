import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { User } from "../user/user.model";
import QueryBuilder from "../../builder/queryBuilder";
import { TImage_gallary } from "./image.interface";
import Image_gallary from "./image.model";


const createImageIntoDb = async (payload: TImage_gallary) => {




    const newImage = await Image_gallary.create(payload)
    return newImage

}



const getAllImageFromDb = async (query: Record<string, unknown>) => {

    const productQuery = new QueryBuilder(
        Image_gallary.find(),
        query,
    )

    const result = await productQuery.modelQuery;


    return {
        result,
    }

}

export const imageService = {
    createImageIntoDb,
    getAllImageFromDb
};
