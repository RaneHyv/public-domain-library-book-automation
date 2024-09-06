import * as fs from "node:fs";
import { readFile, writeFile } from "~file-operations";

function checkAndRead(path: string): string | undefined {
  if (fs.existsSync(path)) {
    return readFile(path);
  }
}

function swapToOtfFont(path: string, data: string): void {
  const newData = data
    .replaceAll(
      `src: url("../../fonts/TASAOrbiterVF.woff2") format("woff2");`,
      `src: url("../../fonts/TASAOrbiterText-Regular.otf") format("opentype");`
    )
    .replaceAll(`font-weight: 450;`, `font-weight: 500;`);

  writeFile(path, newData);
}

// function turnOffDarkModeInvert(path: string, data: string): void {
//   const newData = data.replaceAll(
//     `filter: invert(100%);`,
//     `filter: invert(0);`
//   );

//   writeFile(path, newData);
// }

export function modifyKepubCss(path: string): void {
  // const svgCssPath = `${path}/css/pdl/svg.css`;
  const publicDomainCssPath = `${path}/css/pdl/public-domain.css`;
  const donateCssPath = `${path}/css/pdl/donate.css`;
  const acknowledgmentsCssPath = `${path}/css/pdl/acknowledgments.css`;

  // const svgCss = checkAndRead(svgCssPath);
  const publicDomainCss = checkAndRead(publicDomainCssPath);
  const donateCss = checkAndRead(donateCssPath);
  const acknowledgmentsCss = checkAndRead(acknowledgmentsCssPath);

  // if (svgCss) {
  //   turnOffDarkModeInvert(svgCssPath, svgCss);
  // }

  if (publicDomainCss) {
    swapToOtfFont(publicDomainCssPath, publicDomainCss);
  }

  if (donateCss) {
    swapToOtfFont(donateCssPath, donateCss);
  }

  if (acknowledgmentsCss) {
    swapToOtfFont(acknowledgmentsCssPath, acknowledgmentsCss);
  }
}
