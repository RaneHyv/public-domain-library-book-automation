import * as cheerio from "cheerio";
import * as fs from "fs";
import {
  ADDED_ITEMS,
  ADDED_ITEM_REFS_BACK,
  REMOVED_ITEMS_IDS,
  REMOVED_ITEM_ID_REFS,
} from "~constants";
import { readFile, writeFile } from "~file-operations";
import { pretifyData } from "~helpers";
import type { AvailablePage, BookTypes, ModificationFolders } from "~types";
import type { AddablePages } from "./index";

function removeSingleEmptyLines(content: string): string {
  return content.replace(/^\s*[\r\n]/gmu, "");
}

async function adjustContentFile(
  contentOpf: string,
  addablePage: AvailablePage
): Promise<string> {
  const { contentItemRefs, contentItems } = addablePage;
  const $ = cheerio.load(contentOpf, { xml: true });
  const manifest = $("manifest");
  const spine = $("spine");

  const items = manifest.children("item");
  const itemRefs = spine.children("itemref");

  for (const id of REMOVED_ITEMS_IDS) {
    const item = items.filter(`[id="${id}"]`);
    if (item.length) {
      item.remove();
    }
  }

  for (const idRef of REMOVED_ITEM_ID_REFS) {
    const itemRef = itemRefs.filter(`[idref="${idRef}"]`);
    if (itemRef.length) {
      itemRef.remove();
    }
  }

  manifest.append(`${ADDED_ITEMS} ${contentItems}`);
  spine.prepend(contentItemRefs);
  spine.append(ADDED_ITEM_REFS_BACK);

  const manifestHtml = $.html("manifest");
  const spineHtml = $.html("spine");

  const formattedManifestHtml = await pretifyData(manifestHtml, "xml");
  const formattedSpineHtml = await pretifyData(spineHtml, "xml");
  $("manifest").replaceWith(formattedManifestHtml);
  $("spine").replaceWith(formattedSpineHtml);

  const html = $.html();

  return removeSingleEmptyLines(html);
}

export async function modifyContent(
  modInfo: ModificationFolders,
  addablePages: AddablePages
): Promise<void> {
  for (const [source, path] of Object.entries(modInfo) as [
    BookTypes,
    string,
  ][]) {
    const contentOpfPath = `${path}/content.opf`;
    if (path && fs.existsSync(contentOpfPath)) {
      const opfData = readFile(contentOpfPath);
      const newOpf = await adjustContentFile(opfData, addablePages[source]);
      writeFile(contentOpfPath, newOpf);
    }
  }
}
