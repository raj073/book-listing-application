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
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createOrder = (userId, orderedBooks) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield prisma.order.create({
            data: {
                userId,
                orderedBooks: {
                    createMany: {
                        data: orderedBooks.map((book) => ({
                            bookId: book.bookId,
                            quantity: book.quantity,
                        })),
                    },
                },
                status: "pending",
            },
            include: {
                orderedBooks: true,
            },
        });
        return order;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "An Error Occured while Creating Order");
    }
    finally {
        yield prisma.$disconnect();
    }
});
const getAllOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield prisma.order.findMany({
            include: {
                orderedBooks: true,
            },
        });
        return orders;
    }
    catch (error) {
        throw error;
    }
});
const getAllOrderForSpecificCustomers = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(userId, role);
        if ((role = "customer")) {
            const orders = yield prisma.order.findMany({
                where: { userId: userId },
                include: {
                    orderedBooks: true,
                },
            });
            return orders;
        }
        else {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Access Denied");
        }
    }
    catch (error) {
        throw error;
    }
});
const getSingleOrderById = (orderId, userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(orderId, userId, role);
    const order = yield prisma.order.findUnique({
        where: {
            id: orderId,
        },
        include: {
            orderedBooks: true,
        },
    });
    if (!order) {
        throw new Error("Order not found");
    }
    if (role !== "admin" && order.userId !== userId) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Access denied");
    }
    return order;
});
const decodeToken = (token, secretKey) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        return decoded;
    }
    catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
};
exports.OrderService = {
    createOrder,
    getAllOrder,
    getAllOrderForSpecificCustomers,
    getSingleOrderById,
    decodeToken,
};
