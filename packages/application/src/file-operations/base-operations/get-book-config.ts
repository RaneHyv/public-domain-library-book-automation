import * as fs from "fs";
import * as path from "path";
import { BOOKS_JSON } from "~constants";
import type { Books } from "~types";

export function getBookConfigs(): Books {
  const bookConfigPath = path.join("./books", BOOKS_JSON);
  if (!fs.existsSync(bookConfigPath)) {
    throw new Error(
      `The '${BOOKS_JSON}' file is missing in the '${bookConfigPath}' folder.`
    );
  }

  const content = fs.readFileSync(bookConfigPath, "utf-8");
  const config = JSON.parse(content) as { books: Books };

  if (!config.books) {
    throw new Error(
      `The '${BOOKS_JSON}' file is missing the 'books' property.`
    );
  }

  return config.books;
}
