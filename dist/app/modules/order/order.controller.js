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
exports.OrderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const order_service_1 = require("./order.service");
const secretKey = process.env.JWT_SECRET || "very-secret";
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("Authorization");
    const { orderedBooks } = req.body;
    try {
        if (token) {
            const decodedToken = order_service_1.OrderService.decodeToken(token, secretKey);
            if (decodedToken) {
                const order = yield order_service_1.OrderService.createOrder(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.userId, orderedBooks);
                (0, sendResponse_1.default)(res, {
                    success: true,
                    statusCode: http_status_1.default.OK,
                    message: "Order Created Successfully",
                    data: {
                        id: order.id,
                        userId: order.userId,
                        orderedBooks: order.orderedBooks,
                        status: order.status,
                        createdAt: order.createdAt,
                    },
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "An Error Occurred While Creating Orders",
        });
    }
});
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_service_1.OrderService.getAllOrder();
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Orders Retrieved Successfully",
            data: orders,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An Error Occurred While Retrieving Orders",
        });
    }
});
const getAllOrderForSpecificCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("Authorization");
        if (token) {
            const decodedToken = order_service_1.OrderService.decodeToken(token, secretKey);
            const userId = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.userId;
            const role = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.role;
            console.log(token, userId);
            if (userId && role) {
                const orders = yield order_service_1.OrderService.getAllOrderForSpecificCustomers(userId, role);
                (0, sendResponse_1.default)(res, {
                    success: true,
                    statusCode: http_status_1.default.OK,
                    message: "Orders Retrieved Successfully",
                    data: orders,
                });
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An Error Occurred While Retrieving Orders",
        });
    }
});
const getSingleOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("Authorization");
        const { orderId } = req.params;
        if (token) {
            const decodedToken = order_service_1.OrderService.decodeToken(token, secretKey);
            const userId = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.userId;
            const role = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.role;
            if (userId && role) {
                const order = yield order_service_1.OrderService.getSingleOrderById(orderId, userId, role);
                (0, sendResponse_1.default)(res, {
                    success: true,
                    statusCode: http_status_1.default.OK,
                    message: "Order Fetched Successfully",
                    data: order,
                });
            }
            else {
                (0, sendResponse_1.default)(res, {
                    success: false,
                    statusCode: http_status_1.default.NOT_FOUND,
                    message: "You are not Authorized or Order Not Found",
                });
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: "You are not Authorized or Order Not Found",
        });
    }
});
exports.OrderController = {
    createOrder,
    getAllOrder,
    getAllOrderForSpecificCustomers,
    getSingleOrderById,
};
