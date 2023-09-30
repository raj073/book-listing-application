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

export const BookService = {
  createBook,
};
