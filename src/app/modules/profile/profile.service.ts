import { PrismaClient, User } from "@prisma/client";
import jwt, { Secret } from "jsonwebtoken";
import { DecodedToken } from "../user/user.interface";

const prisma = new PrismaClient();

const getprofile = async (userId: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not Found");
  }

  return user;
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

export const ProfileService = {
  decodeToken,
  getprofile,
};
