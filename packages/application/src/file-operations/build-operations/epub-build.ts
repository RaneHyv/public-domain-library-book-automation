import { DISTROBUTION_FOLDER_PATH } from "~file-operations";
import { runCommand } from "~helpers";
import logger from "~logger";
import { BookConfigs } from "~types";

export async function epubBuild(bookConfigs: BookConfigs): Promise<void> {
  for (const bookConfig of bookConfigs) {
    const { epub, name } = bookConfig;

    await runCommand(`
      cd ${epub}/src && 
      zip -X0 ./${name}.epub mimetype && 
      zip -r ${name}.epub META-INF epub && 
      mv ${name}.epub ../../../../${DISTROBUTION_FOLDER_PATH}/${name}.epub`);

    logger.notice(`The '${name}.epub' file was created successfully.`);
  }
}
