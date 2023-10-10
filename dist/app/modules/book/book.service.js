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
exports.BookService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma = new client_1.PrismaClient();
const createBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.create({
        data,
        include: {
            category: true,
        },
    });
    return result;
});
const getAllBooks = (page, size) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offset = (page - 1) * size;
        const books = yield prisma.book.findMany({
            skip: offset,
            take: size,
            include: {
                category: true,
            },
        });
        return books;
    }
    catch (error) {
        throw error;
    }
    finally {
        yield prisma.$disconnect();
    }
});
const getBooksByCategoryId = (categoryId, page, size) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offset = (page - 1) * size;
        const books = yield prisma.book.findMany({
            where: { categoryId },
            skip: offset,
            take: size,
            include: {
                category: true,
            },
        });
        return books;
    }
    catch (error) {
        throw error;
    }
    finally {
        yield prisma.$disconnect();
    }
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield prisma.book.findMany({
            where: { id },
        });
        return book;
    }
    catch (error) {
        throw error;
    }
    finally {
        yield prisma.$disconnect();
    }
});
const updateSingleBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isBookExist = yield prisma.book.findUnique({ where: { id } });
    if (!isBookExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book Not Found!");
    }
    const result = yield prisma.book.update({
        where: { id },
        data: payload,
    });
    return result;
});
const deleteSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isBookExist = yield prisma.book.findUnique({ where: { id } });
    if (!isBookExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book Not Found!");
    }
    const result = yield prisma.book.delete({
        where: { id },
    });
    return result;
});
exports.BookService = {
    createBook,
    getAllBooks,
    getBooksByCategoryId,
    getSingleBook,
    updateSingleBook,
    deleteSingleBook,
};
