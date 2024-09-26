import * as csv from "csv-parser";
import * as fs from "fs";
import * as path from "path";
import { BOOKS_CSV } from "~constants";
import type { Books } from "~types";

async function readCsvAndFormatToJson(csvFilePath: string): Promise<unknown[]> {
  return new Promise((resolve, reject) => {
    const results: unknown[] = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

export async function getBookConfigs(): Promise<Books> {
  const bookConfigPath = path.join("./books", BOOKS_CSV);
  if (!fs.existsSync(bookConfigPath)) {
    throw new Error(
      `The '${BOOKS_CSV}' file is missing in the '${bookConfigPath}' folder.`
    );
  }

  const config = (await readCsvAndFormatToJson(bookConfigPath)) as Books;

  if (!config) {
    throw new Error(`The '${BOOKS_CSV}' file is missing the 'books' property.`);
  }

  return config;
}
