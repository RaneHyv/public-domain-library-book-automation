import { writeFile } from "~file-operations";

export function swapToOtfFont(path: string, data: string): void {
  const newData = data
    .replaceAll(
      `src: url("../../fonts/TASAOrbiterVF.woff2") format("woff2");`,
      `src: url("../../fonts/TASAOrbiterText-Regular.otf") format("opentype");`
    )
    .replaceAll(`font-weight: 450;`, `font-weight: 500;`);

  writeFile(path, newData);
}
