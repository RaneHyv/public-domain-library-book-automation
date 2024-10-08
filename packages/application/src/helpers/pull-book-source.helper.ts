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
    await runCommand(`rm -rf ${gitFolderPath}`);
  }

  await runCommand(`git clone ${github} ${gitFolderPath}`);
}
