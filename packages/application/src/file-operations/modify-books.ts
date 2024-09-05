import {
  addAssets,
  modifyContent,
  modifyCoreCss,
  modifyPublicDomainPageContent,
  modifyToc,
  removeAssets,
} from "~file-operations";
import { Book, BookFolders } from "~types";

export async function modifyBooks(
  book: Book,
  BookPaths: BookFolders
): Promise<void> {
  const { azw3, epub, kepub, assets } = BookPaths;
  const azw3SrcPath = `${azw3}/epub`;
  const epubSrcPath = `${epub}/epub`;
  const kepubSrcPath = `${kepub}/epub`;

  removeAssets(azw3SrcPath, epubSrcPath, kepubSrcPath);
  addAssets(azw3SrcPath, epubSrcPath, kepubSrcPath, assets, book);
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

  await modifyPublicDomainPageContent(book, BookPaths);
}
