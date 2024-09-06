import * as fs from "fs";
import { readFile } from "./index";

export function checkAndRead(path: string): string | undefined {
  if (fs.existsSync(path)) {
    return readFile(path);
  }
}
