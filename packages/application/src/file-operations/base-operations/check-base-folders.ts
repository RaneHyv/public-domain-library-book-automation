import * as fs from "node:fs";
import {
  BOOKS_FOLDER_PATH,
  COVER_FOLDER_PATH,
  DISTROBUTION_FOLDER_PATH,
  GIT_BOOK_SOURCES_FOLDER_PATH,
  TITLE_FOLDER_PATH,
} from "~constants";

export function checkFilesystem(): void {
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
}
