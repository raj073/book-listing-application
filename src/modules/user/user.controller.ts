import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    console.log("Request Body:", req.body);
    const result = await UserService.createUser(req.body);

    res.send({
      success: true,
      statusCode: httpStatus.OK,
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
