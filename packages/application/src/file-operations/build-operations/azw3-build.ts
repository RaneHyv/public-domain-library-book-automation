import { DISTROBUTION_FOLDER_PATH } from "~constants";
import { runCommand } from "~helpers";
import logger from "~logger";

export async function azw3Build(
  path: string,
  name: string,
  ID: string | undefined
): Promise<void> {
  try {
    if (!path || !name) {
      throw new Error("The path and name are required to build the epub file.");
    }
    const ebook = `${name}.azw3`;
    const initialEbook = `${name}_azw3.epub`;
    const distrobutionFile = `../../../${DISTROBUTION_FOLDER_PATH}/${name}.azw3`;

    await runCommand(`
      cd ${path} &&
      rm -f ${ebook} &&
      rm -f ${initialEbook} && 
      zip -X0 ${initialEbook} mimetype && 
      zip -r ${initialEbook} META-INF epub && 
      ebook-convert ${initialEbook} ${ebook} --pretty-print --no-inline-toc --max-toc-links=0 --prefer-metadata-cover &&
      rm -f ${distrobutionFile} &&
      mv ${ebook} ${distrobutionFile}
    `);

    logger.notice(`The '${ebook}' file was created successfully.`, { ID });
  } catch (error) {
    logger.error(`The '${name}' azw3 file failed to build.`, { error });
  }
}
