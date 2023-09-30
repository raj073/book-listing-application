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

const getSingleCategoryById = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      book: true,
    },
  });
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategoryById,
};
