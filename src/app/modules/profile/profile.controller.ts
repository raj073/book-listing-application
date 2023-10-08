import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { ProfileService } from "./profile.service";

const secretKey = process.env.JWT_SECRET || "very-secret";

const getProfile = async (req: Request, res: Response) => {
  try {
    const token = req.header("Authorization");

    if (token) {
      const decodedToken = ProfileService.decodeToken(token, secretKey);

      const userId = decodedToken?.userId;
      console.log(token, userId);

      if (userId) {
        const order = await ProfileService.getprofile(userId);
        sendResponse(res, {
          success: true,
          statusCode: httpStatus.OK,
          message: "Profile Retrieved Successfully",
          data: order,
        });
      } else {
        sendResponse(res, {
          success: false,
          statusCode: httpStatus.NOT_FOUND,
          message: "You are not Authorized or User Not Found",
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An Error Occurred While Retrieving User Profile",
    });
  }
};

export const ProfileController = {
  getProfile,
};
