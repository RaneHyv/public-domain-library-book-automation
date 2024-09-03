import { copyFiles, getBookConfigs } from "~file-operations";
import { pullBookSources } from "~helpers";
import { BookConfigs } from "~types";

export async function getBooks(): Promise<BookConfigs> {
  const bookConfigs = await getBookConfigs();
  for (const { github, gitFolderPath, azw3, epub, kepub } of bookConfigs) {
    await pullBookSources(gitFolderPath, github);
    for (const file of [azw3, epub, kepub]) {
      await copyFiles(`${gitFolderPath}/src`, file);
    }
  }

  return bookConfigs;
}
