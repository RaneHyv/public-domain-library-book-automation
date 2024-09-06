import { exec } from "node:child_process";
import { promisify } from "node:util";

export const execPromise = promisify(exec);

export async function runCommand(command: string): Promise<void> {
  await execPromise(command);
}
