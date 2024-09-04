import {
  checkFilesystem,
  epubBuild,
  getBooks,
  modifyBooks,
} from "~file-operations";
import logger from "~logger";

async function BookCreationProcess() {
  logger.info("Starting book creation & update process");
  const start = performance.now();
  try {
    checkFilesystem();
    const bookConfigs = await getBooks();
    await modifyBooks(bookConfigs);
    await epubBuild(bookConfigs);
  } catch (error: unknown) {
    logger.error((error as Error).message);
  }
  const end = performance.now();
  logger.info(
    `Book creation & update process finished in ${(end - start).toFixed(2)}ms`
  );
}

BookCreationProcess();
