import { checkFilesystem, getBooks } from "~file-operations";
import logger from "~logger";

logger.info("Starting application");

async function BookCreationProcess() {
  try {
    checkFilesystem();
    await getBooks();
  } catch (error: unknown) {
    logger.error((error as Error).message);
  }
}

BookCreationProcess();
