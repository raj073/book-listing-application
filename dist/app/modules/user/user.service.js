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
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("../../../config"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const secretKey = config_1.default.jwt.secret || "very-secret";
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.create({
        data,
    });
    return result;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        return users;
    }
    catch (error) {
        throw error;
    }
});
const getSingleUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateSingleUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma.user.findUnique({ where: { id } });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Not Found!");
    }
    const result = yield prisma.user.update({
        where: { id },
        data: payload,
    });
    return result;
});
const deleteSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma.user.findUnique({ where: { id } });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Not Found!");
    }
    const result = yield prisma.user.delete({
        where: { id },
    });
    return result;
});
const signIn = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return null;
        }
        if (user.password !== password) {
            return null;
        }
        const token = jsonwebtoken_1.default.sign({
            role: user.role,
            userId: user.id,
        }, secretKey, { expiresIn: "1y" });
        return token;
    }
    catch (error) {
        throw error;
    }
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
exports.UserService = {
    createUser,
    getAllUsers,
    getSingleUserById,
    updateSingleUser,
    deleteSingleUser,
    signIn,
    decodeToken,
};
