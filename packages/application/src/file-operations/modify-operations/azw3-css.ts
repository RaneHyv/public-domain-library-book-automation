import { defaultCssChanges } from "~file-operations";

// function turnOffDarkModeInvert(path: string, data: string): void {
//   const newData = data.replaceAll(
//     `filter: invert(100%);`,
//     `filter: invert(0);`
//   );

//   writeFile(path, newData);
// }

export function modifyAzw3Css(path: string): void {
  // const svgCssPath = `${path}/css/pdl/svg.css`;
  // const svgCss = checkAndRead(svgCssPath);
  // if (svgCss) {
  //   turnOffDarkModeInvert(svgCssPath, svgCss);
  // }

  defaultCssChanges(path);
}
