import * as fs from "fs";
import { runCommand } from "~helpers";
import logger from "~logger";

export async function pullBookSources(
  gitFolderPath: string,
  github: string
): Promise<void> {
  if (fs.existsSync(gitFolderPath)) {
    const files = fs.readdirSync(gitFolderPath);
    if (files.length > 0) {
      logger.notice(`Pulling changes for ${github}`);
      await runCommand(`git -C ${gitFolderPath} pull`);
    }
  } else {
    await runCommand(`git clone ${github} ${gitFolderPath}`);
  }
}
