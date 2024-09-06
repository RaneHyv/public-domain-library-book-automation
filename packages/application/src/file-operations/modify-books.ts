import {
  addAssets,
  checkAddablePages,
  modifyContent,
  modifyCoreCss,
  modifyKepubCss,
  modifyPublicDomainPageContent,
  modifyToc,
  removeAssets,
} from "~file-operations";
import { Book, BookFolders } from "~types";

export async function modifyBooks(
  book: Book,
  BookPaths: BookFolders,
  name: string
): Promise<void> {
  const { azw3, epub, kepub } = BookPaths;
  const azw3SrcPath = `${azw3}/epub`;
  const epubSrcPath = `${epub}/epub`;
  const kepubSrcPath = `${kepub}/epub`;

  removeAssets(azw3SrcPath, epubSrcPath, kepubSrcPath);
  addAssets(azw3SrcPath, epubSrcPath, kepubSrcPath, book, name);
  modifyCoreCss({
    epub: epubSrcPath,
    kepub: kepubSrcPath,
    azw3: azw3SrcPath,
  });

  const addablePages = checkAddablePages(book, {
    epub: epubSrcPath,
    kepub: kepubSrcPath,
    azw3: azw3SrcPath,
  });

  await modifyToc(
    {
      epub: epubSrcPath,
      kepub: kepubSrcPath,
      azw3: azw3SrcPath,
    },
    addablePages
  );

  await modifyContent(
    {
      epub: epubSrcPath,
      kepub: kepubSrcPath,
      azw3: azw3SrcPath,
    },
    addablePages
  );

  await modifyPublicDomainPageContent(book, BookPaths);
  modifyKepubCss(kepubSrcPath);
}
