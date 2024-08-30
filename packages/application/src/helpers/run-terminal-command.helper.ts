import { exec } from "node:child_process";
import { promisify } from "node:util";
import logger from "~logger";

const execPromise = promisify(exec);

export async function runCommand(command: string): Promise<void> {
  try {
    await execPromise(command);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error executing command: ${error.message}`);
    } else {
      logger.error("Unknown error");
    }
  }
}
