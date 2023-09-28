import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (data: User): Promise<User> => {
  console.log("Data:", data);

  const result = await prisma.user.create({
    data,
  });
  return result;
};

export const UserService = {
  createUser,
};
