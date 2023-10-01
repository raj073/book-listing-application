import { Book, PrismaClient } from "@prisma/client";

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

export const BookService = {
  createBook,
  getAllBooks,
};
