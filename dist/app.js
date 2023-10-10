"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const book_route_1 = require("./app/modules/book/book.route");
const category_route_1 = require("./app/modules/category/category.route");
const order_route_1 = require("./app/modules/order/order.route");
const profile_route_1 = require("./app/modules/profile/profile.route");
const user_route_1 = require("./app/modules/user/user.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//User
app.use("/api/v1/auth", user_route_1.UserRoutes);
app.use("/api/v1", user_route_1.UserRoutes);
//Category
app.use("/api/v1/categories", category_route_1.CategoryRoutes);
//Book
app.use("/api/v1/books", book_route_1.BookRoutes);
//Order
app.use("/api/v1/orders", order_route_1.OrderRoutes);
//Profile
app.use("/api/v1/profile", profile_route_1.ProfileRoutes);
//handle not found
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "Not Found",
        errorMessages: [
            {
                path: req.originalUrl,
                message: "API Not Found",
            },
        ],
    });
    next();
});
exports.default = app;
