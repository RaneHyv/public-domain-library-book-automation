import * as fs from "node:fs";

export const PUBLIC_DOMAIN_LIBRARY_ASSETS_FOLDER =
  "public-domain-library-assets" as const;

export const BOOKS_FOLDER = "books" as const;

export const GIT_BOOK_SOURCES_FOLDER = "git-book-sources" as const;

export function checkFilesystem(): void {
  if (!fs.existsSync(`./${PUBLIC_DOMAIN_LIBRARY_ASSETS_FOLDER}`)) {
    fs.mkdirSync(`./${PUBLIC_DOMAIN_LIBRARY_ASSETS_FOLDER}`);
    throw new Error(
      `The '${PUBLIC_DOMAIN_LIBRARY_ASSETS_FOLDER}' folder was missing. ` +
        "It has been created, please add all assets to this folder."
    );
  }

  if (!fs.existsSync(`./${BOOKS_FOLDER}`)) {
    fs.mkdirSync(`./${BOOKS_FOLDER}`);
  }

  if (!fs.existsSync(`./${GIT_BOOK_SOURCES_FOLDER}`)) {
    fs.mkdirSync(`./${GIT_BOOK_SOURCES_FOLDER}`);
  }
}
