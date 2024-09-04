import * as cheerio from "cheerio";
import * as fs from "fs";
import {
  ADDED_ITEMS,
  ADDED_ITEM_REFS_BACK,
  ADDED_ITEM_REFS_FRONT,
  REMOVED_ITEMS_IDS,
  REMOVED_ITEM_ID_REFS,
} from "~constants";
import { readFile, writeFile } from "~file-operations";
import { pretifyData } from "~helpers";
import type { BookModificationInfo } from "~types";

const removeSingleEmptyLines = (content: string): string => {
  return content.replace(/^\s*[\r\n]/gmu, "");
};

async function adjustContentFile(contentOpf: string): Promise<string> {
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

  manifest.append(ADDED_ITEMS);
  spine.prepend(ADDED_ITEM_REFS_FRONT);
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
  modInfo: BookModificationInfo
): Promise<void> {
  for (const path of Object.values(modInfo)) {
    const contentOpfPath = `${path}/content.opf`;
    if (path && fs.existsSync(contentOpfPath)) {
      const opfData = readFile(contentOpfPath);
      const newOpf = await adjustContentFile(opfData);
      writeFile(contentOpfPath, newOpf);
    }
  }
}
