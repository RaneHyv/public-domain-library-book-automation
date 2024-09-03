import {
  addAssets,
  modifyContent,
  modifyCoreCss,
  modifyToc,
  removeAssets,
} from "~file-operations";
import { BookConfigs } from "~types";

export function modifyBooks(bookConfigs: BookConfigs): void {
  for (const { azw3, epub, kepub, creationAssetsFolder } of bookConfigs) {
    const azw3SrcPath = `${azw3}/src/epub`;
    const epubSrcPath = `${epub}/src/epub`;
    const kepubSrcPath = `${kepub}/src/epub`;

    removeAssets(azw3SrcPath, epubSrcPath, kepubSrcPath);
    addAssets(azw3SrcPath, epubSrcPath, kepubSrcPath, creationAssetsFolder);
    modifyContent({
      epub: epubSrcPath,
      kepub: kepubSrcPath,
      azw3: azw3SrcPath,
    });

    modifyCoreCss({
      epub: epubSrcPath,
      kepub: kepubSrcPath,
      azw3: azw3SrcPath,
    });

    modifyToc({ epub: epubSrcPath, kepub: kepubSrcPath, azw3: azw3SrcPath });
  }
}
