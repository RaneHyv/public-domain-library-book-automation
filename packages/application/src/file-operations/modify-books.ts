import {
  addAssets,
  modifyContent,
  modifyCoreCss,
  modifyPublicDomainPageContent,
  modifyToc,
  removeAssets,
} from "~file-operations";
import { BookConfigs } from "~types";

export async function modifyBooks(bookConfigs: BookConfigs): Promise<void> {
  for (const config of bookConfigs) {
    const { azw3, epub, kepub, creationAssetsFolder } = config;
    const azw3SrcPath = `${azw3}/epub`;
    const epubSrcPath = `${epub}/epub`;
    const kepubSrcPath = `${kepub}/epub`;

    removeAssets(azw3SrcPath, epubSrcPath, kepubSrcPath);
    addAssets(azw3SrcPath, epubSrcPath, kepubSrcPath, creationAssetsFolder);
    await modifyContent({
      epub: epubSrcPath,
      kepub: kepubSrcPath,
      azw3: azw3SrcPath,
    });

    modifyCoreCss({
      epub: epubSrcPath,
      kepub: kepubSrcPath,
      azw3: azw3SrcPath,
    });

    await modifyToc({
      epub: epubSrcPath,
      kepub: kepubSrcPath,
      azw3: azw3SrcPath,
    });

    await modifyPublicDomainPageContent(config);
  }
}
