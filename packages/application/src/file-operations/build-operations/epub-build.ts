import { DISTROBUTION_FOLDER_PATH } from "~constants";
import { runCommand } from "~helpers";
import logger from "~logger";

export async function epubBuild(path: string, name: string): Promise<void> {
  if (!path || !name) {
    throw new Error("The path and name are required to build the epub file.");
  }
  const ebook = `${name}.epub`;
  const distrobutionFile = `../../../${DISTROBUTION_FOLDER_PATH}/${name}.epub`;

  await runCommand(`
      cd ${path} && 
      rm -f ${distrobutionFile} &&
      zip -X0 ./${ebook} mimetype && 
      zip -r ${ebook} META-INF epub && 
      mv ${ebook} ${distrobutionFile}`);

  logger.notice(`The '${ebook}' file was created successfully.`);
}
