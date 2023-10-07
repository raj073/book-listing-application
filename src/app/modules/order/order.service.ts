import { OrderedBook } from "@prisma/client";
import httpStatus from "http-status";
import jwt, { Secret } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";
import { DecodedToken } from "../user/user.interface";

const { PrismaClient } = require("@prisma/client");
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
  decodeToken,
};
