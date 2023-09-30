import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { CategoryService } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
  try {
    console.log("Request Category:", req.body);
    const result = await CategoryService.createCategory(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category Created Successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const users = await CategoryService.getAllCategories();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Categories Fetched Successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An Error Occurred While Retrieving Categories.",
    });
  }
};

export const CategoryController = {
  createCategory,
  getAllCategories,
};
