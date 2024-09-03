import * as fs from "node:fs";
import { CHAPTER_MODIFICATION } from "~constants";
import { readFile, writeFile } from "~file-operations";
import type { BookModificationInfo } from "~types";

function removeDarkModeMediaQuery(css: string): string {
  const regex = /@media\s+all\s+and\s+\(prefers-color-scheme:\s+dark\)\s*\{/giu;
  let modifiedCss = css;
  let match;

  while ((match = regex.exec(modifiedCss)) !== null) {
    const startIndex = match.index;
    let openBraces = 1;
    let closeIndex = startIndex + match[0].length;

    while (openBraces > 0 && closeIndex < modifiedCss.length) {
      if (modifiedCss[closeIndex] === "{") {
        openBraces++;
      }

      if (modifiedCss[closeIndex] === "}") {
        openBraces--;
      }

      closeIndex++;
    }

    if (openBraces === 0) {
      modifiedCss =
        modifiedCss.slice(0, startIndex) + modifiedCss.slice(closeIndex);
      regex.lastIndex = startIndex;
    } else {
      break;
    }
  }

  return modifiedCss;
}

export function modifyCoreCss(modInfo: BookModificationInfo): void {
  for (const [type, path] of Object.entries(modInfo)) {
    const coreCssPath = `${path}/css/core.css`;
    if (path && fs.existsSync(coreCssPath)) {
      fs.appendFileSync(coreCssPath, CHAPTER_MODIFICATION);

      if (type && type === "azw3") {
        const data = readFile(coreCssPath);
        const updatedData = removeDarkModeMediaQuery(data);
        writeFile(coreCssPath, updatedData);
      }
    }
  }
}
