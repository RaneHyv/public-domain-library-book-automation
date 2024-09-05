import * as fs from "fs";
import { runCommand } from "~helpers";

export async function pullBookSources(
  gitFolderPath: string,
  github: string | undefined
): Promise<void> {
  if (!github) {
    throw new Error("The github link is required to pull the book sources.");
  }

  if (fs.existsSync(gitFolderPath)) {
    const files = fs.readdirSync(gitFolderPath);
    if (files.length > 0) {
      await runCommand(`git -C ${gitFolderPath} pull`);
    }
  } else {
    await runCommand(`git clone ${github} ${gitFolderPath}`);
  }
}
