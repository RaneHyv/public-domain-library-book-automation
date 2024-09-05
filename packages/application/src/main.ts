import {
  checkFilesystem,
  epubBuild,
  getBookConfigs,
  getBooks,
  modifyBooks,
} from "~file-operations";
import { createBookFileName } from "~helpers";
import logger from "~logger";
import type { Book } from "~types";

async function processBook(book: Book) {
  try {
    const { Title: title, "Author(s)": author } = book;
    const bookFileName = createBookFileName(title, author);
    const bookPaths = await getBooks(book, bookFileName);
    await modifyBooks(book, bookPaths);
    await epubBuild(bookPaths.epub, bookFileName);
  } catch (error: unknown) {
    logger.error(`[${book.ID}] [${book.Title}] ${(error as Error).message}`);
  }
}

async function BookCreationProcess() {
  logger.info("Starting book creation & update process");
  const start = performance.now();

  try {
    checkFilesystem();
    const books = getBookConfigs();
    await Promise.all(books.map((book) => processBook(book)));
  } catch (error: unknown) {
    logger.error((error as Error).message);
  }
  const end = performance.now();
  logger.info(
    `Book creation & update process finished in ${(end - start).toFixed(2)}ms`
  );
}

BookCreationProcess();
