import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";
import type { ModificationFolders } from "~types";
import { writeFile } from "../helpers";

const svgCss = `
@charset "utf-8";
@namespace epub "http://www.idpf.org/2007/ops";

img {
  background-color: #fff !important;
}
` as const;

function processSvgFile(filePath: string): void {
  const svgContent = fs.readFileSync(filePath, "utf-8");
  const $ = cheerio.load(svgContent, { xmlMode: true });

  const $svg = $("svg");
  const width = $svg.attr("width") || "100%";
  const height = $svg.attr("height") || "100%";

  // Add <rect fill="white" /> as the first child of <svg>
  $svg.prepend(`<rect width="${width}" height="${height}" fill="white" />`);

  // Write the modified SVG content back to the file
  fs.writeFileSync(filePath, $.xml());
}

function processFolder(folderPath: string): void {
  const items = fs.readdirSync(folderPath);

  for (const item of items) {
    const itemPath = path.join(folderPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      processFolder(itemPath); // Recursively process subfolders
    } else if (stats.isFile() && item.endsWith(".svg")) {
      processSvgFile(itemPath); // Process SVG files
    }
  }
}

export async function modifySvgCss(
  modInfo: ModificationFolders
): Promise<void> {
  for (const [source, folderPath] of Object.entries(modInfo)) {
    const svgCssPath = `${folderPath}/css/pdl/svg.css`;

    if (source !== "epub" && folderPath && fs.existsSync(svgCssPath)) {
      writeFile(svgCssPath, svgCss);
      processFolder(`${folderPath}/images`);
    }
  }
}
