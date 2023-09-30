import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { BookService } from "./book.service";

const createBook = async (req: Request, res: Response) => {
  try {
    console.log("Request Book:", req.body);
    const result = await BookService.createBook(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book Created Successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const BookController = {
  createBook,
};
