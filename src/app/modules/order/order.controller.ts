import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { OrderService } from "./order.service";

const secretKey = process.env.JWT_SECRET || "very-secret";

const createOrder = async (req: Request, res: Response) => {
  const token = req.header("Authorization");
  const { orderedBooks } = req.body;

  try {
    if (token) {
      const decodedToken = OrderService.decodeToken(token, secretKey);
      if (decodedToken) {
        const order = await OrderService.createOrder(
          decodedToken?.userId,
          orderedBooks
        );

        sendResponse(res, {
          success: true,
          statusCode: httpStatus.OK,
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
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "An Error Occurred While Creating Orders",
    });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const orders = await OrderService.getAllOrder();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Orders Retrieved Successfully",
      data: orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An Error Occurred While Retrieving Orders",
    });
  }
};

const getAllOrderForSpecificCustomers = async (req: Request, res: Response) => {
  try {
    const token = req.header("Authorization");

    if (token) {
      const decodedToken = OrderService.decodeToken(token, secretKey);

      const userId = decodedToken?.userId;
      const role = decodedToken?.role;
      console.log(token, userId);
      if (userId && role) {
        const orders = await OrderService.getAllOrderForSpecificCustomers(
          userId,
          role
        );
        sendResponse(res, {
          success: true,
          statusCode: httpStatus.OK,
          message: "Orders Retrieved Successfully",
          data: orders,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An Error Occurred While Retrieving Orders",
    });
  }
};

const getSingleOrderById = async (req: Request, res: Response) => {
  try {
    const token = req.header("Authorization");
    const { orderId } = req.params;

    if (token) {
      const decodedToken = OrderService.decodeToken(token, secretKey);

      const userId = decodedToken?.userId;
      const role = decodedToken?.role;

      if (userId && role) {
        const order = await OrderService.getSingleOrderById(
          orderId,
          userId,
          role
        );

        sendResponse(res, {
          success: true,
          statusCode: httpStatus.OK,
          message: "Order Fetched Successfully",
          data: order,
        });
      } else {
        sendResponse(res, {
          success: false,
          statusCode: httpStatus.NOT_FOUND,
          message: "You are not Authorized or Order Not Found",
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "You are not Authorized or Order Not Found",
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrder,
  getAllOrderForSpecificCustomers,
  getSingleOrderById,
};
