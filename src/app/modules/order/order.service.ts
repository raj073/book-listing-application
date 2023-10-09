import { Order, OrderedBook } from "@prisma/client";
import httpStatus from "http-status";
import jwt, { Secret } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";
import { DecodedToken } from "../user/user.interface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createOrder = async (userId: string, orderedBooks: OrderedBook[]) => {
  try {
    const order = await prisma.order.create({
      data: {
        userId,
        orderedBooks: {
          createMany: {
            data: orderedBooks.map((book) => ({
              bookId: book.bookId,
              quantity: book.quantity,
            })),
          },
        },
        status: "pending",
      },
      include: {
        orderedBooks: true,
      },
    });

    return order;
  } catch (error) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "An Error Occured while Creating Order"
    );
  } finally {
    await prisma.$disconnect();
  }
};

const getAllOrder = async (): Promise<Order[]> => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderedBooks: true,
      },
    });

    return orders;
  } catch (error) {
    throw error;
  }
};

const getAllOrderForSpecificCustomers = async (
  userId: string,
  role: string
) => {
  try {
    console.log(userId, role);
    if ((role = "customer")) {
      const orders = await prisma.order.findMany({
        where: { userId: userId },
        include: {
          orderedBooks: true,
        },
      });
      return orders;
    } else {
      throw new ApiError(httpStatus.FORBIDDEN, "Access Denied");
    }
  } catch (error) {
    throw error;
  }
};

const getSingleOrderById = async (
  orderId: string,
  userId: string,
  role: string
) => {
  console.log(orderId, userId, role);
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      orderedBooks: true,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (role !== "admin" && order.userId !== userId) {
    throw new ApiError(httpStatus.NOT_FOUND, "Access denied");
  }
  return order;
};

const decodeToken = (token: string, secretKey: Secret): DecodedToken | null => {
  try {
    const decoded = jwt.verify(token, secretKey) as DecodedToken;
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};

export const OrderService = {
  createOrder,
  getAllOrder,
  getAllOrderForSpecificCustomers,
  getSingleOrderById,
  decodeToken,
};
