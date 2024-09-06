import { runCommand } from "~helpers";

export async function copyFiles(
  source: string,
  destination: string
): Promise<void> {
  await runCommand(`cp -r ${source} ${destination}`);
}
