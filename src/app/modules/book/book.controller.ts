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

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 10;

    console.log(page, size);

    const books = await BookService.getAllBooks(page, size);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Books Fetched Successfully",
      meta: {
        page,
        size,
        total: books.length,
        totalpage: Math.ceil(books.length / size),
      },
      data: books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An Error Occurred While Fetching Books.",
    });
  }
};

export const BookController = {
  createBook,
  getAllBooks,
};
