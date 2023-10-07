import { Request, Response } from "express";
import { OrderService } from "./order.service";

const secretKey = process.env.JWT_SECRET || "very-secret";

const createOrder = async (req: Request, res: Response) => {
  const token = req.header("Authorization");
  const { orderedBooks } = req.body;

  try {
    if (token) {
      const decodedToken = OrderService.decodeToken(token, secretKey);
      console.log(decodedToken);
      if (decodedToken) {
        const order = await OrderService.createOrder(
          decodedToken?.userId,
          orderedBooks
        );
        res.status(200).json({
          success: true,
          statusCode: 200,
          message: "Order created successfully",
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
      message: "Internal Server Error",
    });
  }
};

export const OrderController = {
  createOrder,
};
