import { PrismaClient, User } from "@prisma/client";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import { DecodedToken } from "./user.interface";
import config from "../../../config";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";

dotenv.config();

const prisma = new PrismaClient();

const secretKey = config.jwt.secret || "very-secret";

const createUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

const getAllUsers = async (): Promise<User[]> => {
  try {
    const users = await prisma.user.findMany();

    return users;
  } catch (error) {
    throw error;
  }
};

const getSingleUserById = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateSingleUser = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  const isUserExist = await prisma.user.findUnique({ where: { id } });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found!");
  }

  const result = await prisma.user.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteSingleUser = async (id: string): Promise<User> => {
  const isUserExist = await prisma.user.findUnique({ where: { id } });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found!");
  }

  const result = await prisma.user.delete({
    where: { id },
  });
  return result;
};

const signIn = async (
  email: string,
  password: string
): Promise<string | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    if (user.password !== password) {
      return null;
    }

    const token = jwt.sign(
      {
        role: user.role,
        userId: user.id,
      },
      secretKey,
      { expiresIn: "1y" } // Token expires date 1y
    );

    return token;
  } catch (error) {
    throw error;
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

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUserById,
  updateSingleUser,
  deleteSingleUser,
  signIn,
  decodeToken,
};
