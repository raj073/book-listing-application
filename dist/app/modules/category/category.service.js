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
exports.CategoryService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma = new client_1.PrismaClient();
const createCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.category.create({
        data,
    });
    return result;
});
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const catogories = yield prisma.category.findMany();
        return catogories;
    }
    catch (error) {
        throw error;
    }
});
const getSingleCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.category.findUnique({
        where: {
            id,
        },
        include: {
            book: true,
        },
    });
    return result;
});
const updateSingleCategory = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isCategoryExist = yield prisma.category.findUnique({ where: { id } });
    if (!isCategoryExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Category Not Found!");
    }
    const result = yield prisma.category.update({
        where: { id },
        data: payload,
    });
    return result;
});
const deleteSingleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isCategoryExist = yield prisma.category.findUnique({ where: { id } });
    console.log(isCategoryExist);
    if (!isCategoryExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Category Not Found!");
    }
    const result = yield prisma.category.delete({
        where: { id },
    });
    return result;
});
exports.CategoryService = {
    createCategory,
    getAllCategories,
    getSingleCategoryById,
    updateSingleCategory,
    deleteSingleCategory,
};
