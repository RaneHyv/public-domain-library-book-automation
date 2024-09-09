import * as cheerio from "cheerio";
import * as fs from "fs";
import { TITLE_NAME, TITLE_PAGE_IMG_ELEMNET } from "~constants";
import { pretifyData } from "~helpers";
import type { Book, BookFolders } from "~types";
import { readFile, writeFile } from "../helpers";

export async function modifyTitlePageContent(
  book: Book,
  BookPaths: BookFolders
): Promise<void> {
  const { azw3, epub, kepub } = BookPaths;
  const {
    Title: title,
    "Author(s)": authors,
    "Translator(s)": translators,
  } = book;

  for (const srcPath of [azw3, epub, kepub]) {
    const svgPath = `${srcPath}/epub${TITLE_NAME}`;
    const path = `${srcPath}/epub/text/titlepage.xhtml`;
    if (!fs.existsSync(path)) {
      continue;
    }

    const data = readFile(path);
    const $ = cheerio.load(data, { xml: true });
    const contentContainer = $("#titlepage-container");

    if (fs.existsSync(svgPath)) {
      contentContainer.append(TITLE_PAGE_IMG_ELEMNET);
    } else {
      contentContainer.append(`
        <h2 id="title-text">${title}</h2>
        <img
          src="../images/pdl-black-logo.svg"
          alt="Public domain library logo"
          class="logo-image"
        />
        <h2 id="author-text">${authors}</h2>
        `);

      if (translators) {
        contentContainer.append(`
          <h3 id="translator-text">Translated by ${translators}</h3>
        `);
      }
    }

    const html = $.html();
    const formattedHtml = await pretifyData(html, "html");

    writeFile(path, formattedHtml);
  }
}
