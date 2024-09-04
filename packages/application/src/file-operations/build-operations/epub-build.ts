import { DISTROBUTION_FOLDER_PATH } from "~file-operations";
import { runCommand } from "~helpers";
import logger from "~logger";
import { BookConfigs } from "~types";

export async function epubBuild(bookConfigs: BookConfigs): Promise<void> {
  for (const bookConfig of bookConfigs) {
    const { epub, name } = bookConfig;
    const ebook = `${name}.epub`;
    const distrobutionFile = `../../../${DISTROBUTION_FOLDER_PATH}/${name}.epub`;

    await runCommand(`
      cd ${epub} && 
      rm -f ${distrobutionFile} &&
      zip -X0 ./${ebook} mimetype && 
      zip -r ${ebook} META-INF epub && 
      mv ${ebook} ${distrobutionFile}`);

    logger.notice(`The '${ebook}' file was created successfully.`);
  }
}
