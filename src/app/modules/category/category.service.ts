import { PrismaClient, Category } from "@prisma/client";

const prisma = new PrismaClient();

const createCategory = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};

const getAllCategories = async (): Promise<Category[]> => {
  try {
    const catogories = await prisma.category.findMany();

    return catogories;
  } catch (error) {
    throw error;
  }
};

export const CategoryService = {
  createCategory,
  getAllCategories,
};
