import * as fse from "fs-extra";
import * as fs from "node:fs";
import { PUBLIC_DOMAIN_LIBRARY_ASSETS_FOLDER_PATH } from "~constants";
import logger from "~logger";
import type { Book } from "~types";

export function addAssets(
  azw3: string,
  epub: string,
  kepub: string,
  creationAssetsFolder: string,
  book: Book
): void {
  const { Title, ID } = book || {};
  const assetFolders = ["text", "images", "fonts", "css"];

  assetFolders.forEach((folder) => {
    const sourcePath = `${PUBLIC_DOMAIN_LIBRARY_ASSETS_FOLDER_PATH}/${folder}`;
    const azw3Path = `${azw3}/${folder}`;
    const epubPath = `${epub}/${folder}`;
    const kepubPath = `${kepub}/${folder}`;

    if (fs.existsSync(sourcePath)) {
      fse.copySync(sourcePath, azw3Path, { overwrite: true });
      fse.copySync(sourcePath, epubPath, { overwrite: true });
      fse.copySync(sourcePath, kepubPath, { overwrite: true });
    } else {
      throw new Error(
        `The '${folder}' common folder is missing in the public domain library assets.`
      );
    }
  });

  const creationFolders = ["images"];

  creationFolders.forEach((folder) => {
    const sourcePath = `${creationAssetsFolder}/${folder}`;
    const azw3Path = `${azw3}/${folder}`;
    const epubPath = `${epub}/${folder}`;
    const kepubPath = `${kepub}/${folder}`;

    if (fs.existsSync(sourcePath)) {
      fse.copySync(sourcePath, azw3Path, { overwrite: true });
      fse.copySync(sourcePath, epubPath, { overwrite: true });
      fse.copySync(sourcePath, kepubPath, { overwrite: true });
    } else {
      logger.warning(
        `The '${folder}' folder was missing in the book ${Title} (${ID})`
      );
    }
  });
}
