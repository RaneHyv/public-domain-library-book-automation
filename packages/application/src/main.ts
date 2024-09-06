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

const GENERAL_TAG = "General" as const;

async function processBook(book: Book) {
  try {
    const { Title: title, "Author(s)": author, ID } = book;
    const bookFileName = createBookFileName(title, author, ID);
    const bookPaths = await getBooks(book, bookFileName);
    await modifyBooks(book, bookPaths, bookFileName);
    await epubBuild(bookPaths.epub, bookFileName, ID);
  } catch (error: unknown) {
    logger.error(`${(error as Error).message}`, { ID: book.ID });
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
    logger.error((error as Error).message, { ID: GENERAL_TAG });
  }
  const end = performance.now();
  logger.info(
    `Book creation & update process finished in ${((end - start) / 1000).toFixed(2)}s`
  );
}

BookCreationProcess();
