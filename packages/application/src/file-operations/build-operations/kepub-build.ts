import { DISTROBUTION_FOLDER_PATH } from "~constants";
import { runCommand } from "~helpers";
import logger from "~logger";

export async function kepubBuild(
  path: string,
  name: string,
  ID: string | undefined
): Promise<void> {
  try {
    if (!path || !name) {
      throw new Error(
        "The path and name are required to build the kepub file."
      );
    }

    const ebook = `${name}.kepub.epub`;
    const distrobutionFile = `../../../${DISTROBUTION_FOLDER_PATH}/${name}.kepub.epub`;

    await runCommand(`
      cd ${path} && 
      rm -f ${distrobutionFile} &&
      zip -X0 ./${ebook} mimetype && 
      zip -r ${ebook} META-INF epub && 
      mv ${ebook} ${distrobutionFile}`);

    logger.notice(`The '${ebook}' file was created successfully.`, { ID });
  } catch (error) {
    logger.error(`The '${name}' kepub file failed to build.`, { error });
  }
}
