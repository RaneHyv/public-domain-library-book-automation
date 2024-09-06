import * as fs from "node:fs";
import {
  BOOKS_FOLDER_PATH,
  COVER_FOLDER_PATH,
  DISTROBUTION_FOLDER_PATH,
  GIT_BOOK_SOURCES_FOLDER_PATH,
  TITLE_FOLDER_PATH,
} from "~constants";
import { execPromise } from "~helpers";
import logger from "~logger";

export async function checkFilesystem(): Promise<void> {
  const folders = [
    BOOKS_FOLDER_PATH,
    GIT_BOOK_SOURCES_FOLDER_PATH,
    DISTROBUTION_FOLDER_PATH,
    COVER_FOLDER_PATH,
    TITLE_FOLDER_PATH,
  ];

  folders.forEach((folder) => {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
  });

  await execPromise("calibre --version").catch(() => {
    logger.error(
      "Calibre is not installed. Please install Calibre to use the application."
    );

    process.exit(1);
  });
}
