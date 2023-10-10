"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const book_service_1 = require("./book.service");
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Request Book:", req.body);
        const result = yield book_service_1.BookService.createBook(req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Book Created Successfully",
            data: result,
        });
    }
    catch (error) {
        res.send(error);
    }
});
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;
        console.log(page, size);
        const books = yield book_service_1.BookService.getAllBooks(page, size);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Books Fetched Successfully",
            meta: {
                page,
                size,
                total: books.length,
                totalpage: Math.ceil(books.length / size),
            },
            data: books,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An Error Occurred While Fetching Books.",
        });
    }
});
const getBooksByCategoryId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;
        console.log(categoryId, page, size);
        const books = yield book_service_1.BookService.getBooksByCategoryId(categoryId, page, size);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Books with Associated Category Data Fetched Successfully",
            meta: {
                page,
                size,
                total: books.length,
                totalpage: Math.ceil(books.length / size),
            },
            data: books,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An Error Occurred While Fetching Books with Associated Category",
        });
    }
});
const getSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        const book = yield book_service_1.BookService.getSingleBook(id);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Book Fetched Successfully",
            data: book,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An Error Occurred While Fetching Book.",
        });
    }
});
const updateSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield book_service_1.BookService.updateSingleBook(id, req.body);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Book Updated Successfully",
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An Error Occurred While Updating Book",
        });
    }
});
const deleteSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield book_service_1.BookService.deleteSingleBook(id);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Book is Deleted Successfully",
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An Error Occurred While Deleting Book",
        });
    }
});
exports.BookController = {
    createBook,
    getAllBooks,
    getBooksByCategoryId,
    getSingleBook,
    updateSingleBook,
    deleteSingleBook,
};
