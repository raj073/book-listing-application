import { PrismaClient, Category } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";

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

const updateSingleCategory = async (
  id: string,
  payload: Partial<Category>
): Promise<Category | null> => {
  const isCategoryExist = await prisma.category.findUnique({ where: { id } });

  if (!isCategoryExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category Not Found!");
  }

  const result = await prisma.category.update({
    where: { id },
    data: payload,
  });
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategoryById,
  updateSingleCategory,
};
