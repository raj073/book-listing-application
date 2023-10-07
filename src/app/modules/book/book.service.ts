import { Book, PrismaClient } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";

const prisma = new PrismaClient();

const createBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllBooks = async (page: number, size: number): Promise<Book[]> => {
  try {
    const offset = (page - 1) * size;
    const books = await prisma.book.findMany({
      skip: offset,
      take: size,
      include: {
        category: true,
      },
    });

    return books;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

const getSingleBook = async (id: string): Promise<Book[]> => {
  try {
    const book = await prisma.book.findMany({
      where: { id },
    });

    return book;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

const updateSingleBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book | null> => {
  const isBookExist = await prisma.book.findUnique({ where: { id } });

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book Not Found!");
  }

  const result = await prisma.book.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteSingleBook = async (id: string): Promise<Book> => {
  const isBookExist = await prisma.book.findUnique({ where: { id } });

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book Not Found!");
  }

  const result = await prisma.book.delete({
    where: { id },
  });
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateSingleBook,
  deleteSingleBook,
};
