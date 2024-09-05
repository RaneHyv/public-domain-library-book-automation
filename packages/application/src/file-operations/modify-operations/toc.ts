import * as cheerio from "cheerio";
import * as fs from "fs";
import { TOC_BACK_ADDITIONS, TOC_FRONT_ADDITIONS } from "~constants";
import { readFile, writeFile } from "~file-operations";
import { pretifyData } from "~helpers";
import type { ModificationFolders } from "~types";

async function swapTocContent(tocXhtml: string): Promise<string> {
  const $ = cheerio.load(tocXhtml, { xml: true });
  let nav = $("nav#toc");
  if (nav.length === 0) {
    nav = $("nav").first().attr("id", "toc");
  }

  const ol = nav.find("ol");

  ol.children("li").slice(0, 2).remove();
  ol.children("li").slice(-2).remove();
  ol.prepend(TOC_FRONT_ADDITIONS.trim());
  ol.append(TOC_BACK_ADDITIONS.trim());

  ol.contents()
    .filter(function () {
      return this.type === "text" && !/\S/u.test(this.nodeValue);
    })
    .remove();

  const html = $.html();

  return pretifyData(html, "html");
}

export async function modifyToc(modInfo: ModificationFolders): Promise<void> {
  for (const path of Object.values(modInfo)) {
    const tocXhtmlPath = `${path}/toc.xhtml`;
    if (path && fs.existsSync(tocXhtmlPath)) {
      const xhtmlData = readFile(tocXhtmlPath);
      const newToc = await swapTocContent(xhtmlData);
      writeFile(tocXhtmlPath, newToc);
    }
  }
}
