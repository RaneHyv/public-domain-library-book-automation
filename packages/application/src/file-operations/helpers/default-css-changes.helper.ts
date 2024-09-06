import * as fs from "fs";
import { ALT_IMG_SETTINGS } from "~constants";
import { checkAndRead, swapToOtfFont, writeFile } from "./index";

export function defaultCssChanges(path: string): void {
  const coverCssPath = `${path}/css/pdl/cover.css`;
  const publicDomainCssPath = `${path}/css/pdl/public-domain.css`;
  const donateCssPath = `${path}/css/pdl/donate.css`;
  const acknowledgmentsCssPath = `${path}/css/pdl/acknowledgments.css`;

  const publicDomainCss = checkAndRead(publicDomainCssPath);
  const donateCss = checkAndRead(donateCssPath);
  const acknowledgmentsCss = checkAndRead(acknowledgmentsCssPath);

  if (publicDomainCss) {
    swapToOtfFont(publicDomainCssPath, publicDomainCss);
  }

  if (donateCss) {
    swapToOtfFont(donateCssPath, donateCss);
  }

  if (acknowledgmentsCss) {
    swapToOtfFont(acknowledgmentsCssPath, acknowledgmentsCss);
  }

  if (fs.existsSync(coverCssPath)) {
    writeFile(coverCssPath, ALT_IMG_SETTINGS);
  }
}
