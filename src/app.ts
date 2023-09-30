import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { BookRoutes } from "./app/modules/book/book.route";
import { CategoryRoutes } from "./app/modules/category/category.route";
import { UserRoutes } from "./app/modules/user/user.route";

const app: Application = express();

app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//User
app.use("/api/v1/auth", UserRoutes);
app.use("/api/v1", UserRoutes);

//Category
app.use("/api/v1/categories", CategoryRoutes);

//Book
app.use("/api/v1/books", BookRoutes);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
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

export default app;
