import * as fs from "fs";
import * as path from "path";
import {
  BOOKS_FOLDER,
  GIT_BOOK_SOURCES_FOLDER,
  cleanBookSrc,
} from "~file-operations";
import logger from "~logger";
import { BookConfigs } from "~types";

const BOOK_CONFIG_FILE = "config.txt" as const;

function readBookCofigFile(
  bookDir: string
): Record<string, string> | undefined {
  const configPath = path.join(bookDir, BOOK_CONFIG_FILE);
  if (!fs.existsSync(configPath)) {
    return;
  }

  const content = fs.readFileSync(configPath, "utf-8");
  const lines = content.split("\n");
  const config: Record<string, string> = {};

  for (const line of lines) {
    const [key, value] = line.split("=");
    config[key.trim()] = value.trim();
  }

  if (!config.github) {
    logger.error(
      `The 'github' key is missing in the config file: ${configPath}`
    );

    return;
  }

  return config;
}

export async function getBookConfigs(): Promise<BookConfigs> {
  const baseDir = `./${BOOKS_FOLDER}`;
  const gitBaseDir = `./${GIT_BOOK_SOURCES_FOLDER}`;
  const items = fs.readdirSync(baseDir);
  const bookConfigs: BookConfigs = [];

  for (const item of items) {
    const folderPath = path.join(baseDir, item);
    const gitFolderPath = path.join(gitBaseDir, item);
    if (fs.statSync(folderPath).isDirectory()) {
      const srcFolders = cleanBookSrc(folderPath);
      const { github } = readBookCofigFile(folderPath) || {};
      if (github) {
        const creationAssetsFolder = path.join(folderPath, "creation-assets");

        bookConfigs.push({
          folderPath,
          gitFolderPath,
          github,
          creationAssetsFolder,
          name: item,
          ...srcFolders,
        });
      }
    }
  }

  return bookConfigs;
}
