import * as fse from "fs-extra";
import * as fs from "node:fs";
import { PUBLIC_DOMAIN_LIBRARY_ASSETS_FOLDER_PATH } from "~file-operations";

export function addAssets(
  azw3: string,
  epub: string,
  kepub: string,
  creationAssetsFolder: string
): void {
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
        `The '${folder}' folder was missing in the '${PUBLIC_DOMAIN_LIBRARY_ASSETS_FOLDER_PATH}' folder. ` +
          `Please add the '${folder}' folder to this folder.`
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
      throw new Error(
        `The '${folder}' folder was missing in the '${creationAssetsFolder}' folder. ` +
          `Please add the '${folder}' folder to this folder.`
      );
    }
  });
}
