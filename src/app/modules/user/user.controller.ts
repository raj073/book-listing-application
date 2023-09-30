import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";

const secretKey = process.env.JWT_SECRET || "very-secret";

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

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Retrieved Successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An Error Occurred While Retrieving Users.",
    });
  }
};

const getSingleUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log(id);
    const users = await UserService.getSingleUserById(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Fetched Successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An Error Occurred While Retrieving Single Users.",
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("Update ID:", id);
    console.log("Request Body:", req.body);
    const result = await UserService.updateSingleUser(id, req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Updated Successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An Error Occurred While Updating Single User",
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await UserService.deleteSingleUser(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Deleted Successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An Error Occurred While Deleting User",
    });
  }
};

const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = await UserService.signIn(email, password);

    console.log("Token:", token);

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication failed." });
    }

    // Decode the token
    const decodedToken = UserService.decodeToken(token, secretKey);

    res.setHeader("Authorization", `Bearer ${token}`);

    res.status(200).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "User Signin Successfully!",
      data: token,
      decodedToken,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "An error occurred while signing in." });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUserById,
  updateSingleUser,
  deleteSingleUser,
  signIn,
};
