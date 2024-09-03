import * as fs from "node:fs";

export const PUBLIC_DOMAIN_LIBRARY_ASSETS_FOLDER =
  "public-domain-library-assets" as const;

export const BOOKS_FOLDER = "books" as const;
export const GIT_BOOK_SOURCES_FOLDER = "git-book-sources" as const;
export const DISTROBUTION_FOLDER = "book-distrobution";

export const PUBLIC_DOMAIN_LIBRARY_ASSETS_FOLDER_PATH =
  `./${PUBLIC_DOMAIN_LIBRARY_ASSETS_FOLDER}` as const;

export const BOOKS_FOLDER_PATH = `./${BOOKS_FOLDER}` as const;
export const GIT_BOOK_SOURCES_FOLDER_PATH =
  `./${GIT_BOOK_SOURCES_FOLDER}` as const;

export const DISTROBUTION_FOLDER_PATH = `./${DISTROBUTION_FOLDER}` as const;

export function checkFilesystem(): void {
  if (!fs.existsSync(PUBLIC_DOMAIN_LIBRARY_ASSETS_FOLDER_PATH)) {
    fs.mkdirSync(PUBLIC_DOMAIN_LIBRARY_ASSETS_FOLDER_PATH);
    throw new Error(
      `The '${PUBLIC_DOMAIN_LIBRARY_ASSETS_FOLDER}' folder was missing. ` +
        "It has been created, please add all assets to this folder."
    );
  }

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
