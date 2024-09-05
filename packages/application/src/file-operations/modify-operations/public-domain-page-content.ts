import * as cheerio from "cheerio";
import { readFile, writeFile } from "~file-operations";
import { pretifyData } from "~helpers";
import { Book, BookFolders } from "~types";

export async function modifyPublicDomainPageContent(
  book: Book,
  bookConfigs: BookFolders
): Promise<void> {
  const { azw3, epub, kepub } = bookConfigs;
  const {
    "PD - Title": publicDomaiPageTitle,
    "PD - Text": publicDomaiPageContent,
  } = book;

  for (const srcPath of [azw3, epub, kepub]) {
    const path = `${srcPath}/epub/text/public-domain.xhtml`;
    const data = readFile(path);
    const $ = cheerio.load(data, { xml: true });

    $("#public-domain-page-title").text(publicDomaiPageTitle);
    const contentContainer = $("#public-domain-page-content");
    contentContainer.append(
      `<p>${publicDomaiPageContent.split("\\n").join(`</p><br /><p>`)}</p>`
    );

    const html = $.html();
    const formattedHtml = await pretifyData(html, "html");

    writeFile(path, formattedHtml);
  }
}
