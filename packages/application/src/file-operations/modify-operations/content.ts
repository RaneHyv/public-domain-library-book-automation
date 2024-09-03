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
import type { BookModificationInfo } from "~types";

function adjustContentFile(contentOpf: string): string {
  const $ = cheerio.load(contentOpf, { xmlMode: true });
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

  // manifest
  //   .contents()
  //   .filter(function () {
  //     return this.type === "text" && !/\S/u.test(this.nodeValue);
  //   })
  //   .remove();

  // spine.contents().filter(function () {
  //   return this.type === "text" && !/\S/u.test(this.nodeValue);
  // });

  return $.html();
}

export function modifyContent(modInfo: BookModificationInfo): void {
  for (const path of Object.values(modInfo)) {
    const contentOpfPath = `${path}/content.opf`;
    if (path && fs.existsSync(contentOpfPath)) {
      const opfData = readFile(contentOpfPath);
      const newOpf = adjustContentFile(opfData);
      writeFile(contentOpfPath, newOpf);
    }
  }
}
