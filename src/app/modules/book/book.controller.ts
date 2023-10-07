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

const getSingleBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    console.log(id);

    const book = await BookService.getSingleBook(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Book Fetched Successfully",
      data: book,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An Error Occurred While Fetching Book.",
    });
  }
};

const updateSingleBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await BookService.updateSingleBook(id, req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Book Updated Successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An Error Occurred While Updating Book",
    });
  }
};

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateSingleBook,
};
