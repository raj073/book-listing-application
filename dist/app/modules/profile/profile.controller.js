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
exports.ProfileController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const profile_service_1 = require("./profile.service");
const secretKey = process.env.JWT_SECRET || "very-secret";
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("Authorization");
        if (token) {
            const decodedToken = profile_service_1.ProfileService.decodeToken(token, secretKey);
            const userId = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.userId;
            if (userId) {
                const order = yield profile_service_1.ProfileService.getprofile(userId);
                (0, sendResponse_1.default)(res, {
                    success: true,
                    statusCode: http_status_1.default.OK,
                    message: "Profile Retrieved Successfully",
                    data: order,
                });
            }
            else {
                (0, sendResponse_1.default)(res, {
                    success: false,
                    statusCode: http_status_1.default.NOT_FOUND,
                    message: "You are not Authorized or User Not Found",
                });
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An Error Occurred While Retrieving User Profile",
        });
    }
});
exports.ProfileController = {
    getProfile,
};
