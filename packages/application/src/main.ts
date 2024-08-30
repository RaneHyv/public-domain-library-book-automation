import { checkFilesystem, getBooks } from "~file-operations";
import logger from "~logger";

async function BookCreationProcess() {
  try {
    checkFilesystem();
    await getBooks();
  } catch (error: unknown) {
    logger.error((error as Error).message);
  }
}

logger.info("Starting book creation & update process");
const start = performance.now();
BookCreationProcess();
const end = performance.now();
logger.info(
  `Book creation & update process finished in ${(end - start).toFixed(2)}ms`
);
