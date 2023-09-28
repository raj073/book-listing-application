import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../shared/sendResponse";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    console.log("Request Body:", req.body);
    const result = await UserService.createUser(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Created Successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const UserController = {
  createUser,
};
