import * as fs from "node:fs";
import {
  BOOKS_FOLDER_PATH,
  DISTROBUTION_FOLDER_PATH,
  GIT_BOOK_SOURCES_FOLDER_PATH,
} from "~constants";

export function checkFilesystem(): void {
  if (!fs.existsSync(BOOKS_FOLDER_PATH)) {
    fs.mkdirSync(BOOKS_FOLDER_PATH);
  }

  if (!fs.existsSync(GIT_BOOK_SOURCES_FOLDER_PATH)) {
    fs.mkdirSync(GIT_BOOK_SOURCES_FOLDER_PATH);
  }

  if (!fs.existsSync(DISTROBUTION_FOLDER_PATH)) {
    fs.mkdirSync(DISTROBUTION_FOLDER_PATH);
  }
}
