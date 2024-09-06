import * as fs from "fs";
import {
  CONTENT_ITEMS_COVER,
  CONTENT_ITEMS_OTF_FONTS,
  CONTENT_ITEMS_PUBLIC_DOMAIN,
  CONTENT_ITEMS_TITLE_PAGE,
  CONTENT_ITEMS_WOFF_FONTS,
  CONTENT_ITEM_REFS_COVER,
  CONTENT_ITEM_REFS_PUBLIC_DOMAIN,
  CONTENT_ITEM_REFS_TITLE_PAGE,
  COVER_NAME,
  TITLE_NAME,
  TOC_COVER,
  TOC_PUBLIC_DOMAIN,
  TOC_TITLE_PAGE,
} from "~constants";
import type {
  AvailablePage,
  Book,
  BookTypes,
  ModificationFolders,
} from "~types";

export type AddablePages = Record<BookTypes, AvailablePage>;

function getContent(
  addPublicDomain: boolean,
  addCover: boolean,
  addTitlePage: boolean,
  source: BookTypes
): {
  contentItems: string;
  contentItemRefs: string;
} {
  let contentItems = "";
  let contentItemRefs = "";

  contentItems +=
    source === "epub" ? CONTENT_ITEMS_WOFF_FONTS : CONTENT_ITEMS_OTF_FONTS;

  if (addCover) {
    contentItems += CONTENT_ITEMS_COVER;
    contentItemRefs += CONTENT_ITEM_REFS_COVER;
  }

  if (addTitlePage) {
    contentItems += CONTENT_ITEMS_TITLE_PAGE;
    contentItemRefs += CONTENT_ITEM_REFS_TITLE_PAGE;
  }

  if (addPublicDomain) {
    contentItems += CONTENT_ITEMS_PUBLIC_DOMAIN;
    contentItemRefs += CONTENT_ITEM_REFS_PUBLIC_DOMAIN;
  }

  return { contentItems, contentItemRefs };
}

function getToc(
  addCover: boolean,
  addTitlePage: boolean,
  addPublicDomain: boolean
): string {
  let toc = "";
  if (addCover) {
    toc += TOC_COVER;
  }

  if (addTitlePage) {
    toc += ` ${TOC_TITLE_PAGE} `;
  }

  if (addPublicDomain) {
    toc += TOC_PUBLIC_DOMAIN;
  }

  return toc;
}

function removeUnnecesaryFiles(
  path: string,
  addCover: boolean,
  addTitlePage: boolean,
  addPublicDomain: boolean,
  epub: boolean
): void {
  if (epub) {
    fs.rmSync(`${path}/fonts/TASAOrbiterText-Regular.otf`, { force: true });
  } else {
    fs.rmSync(`${path}/fonts/TASAOrbiterVF.woff2`, { force: true });
  }

  if (!addCover) {
    fs.rmSync(`${path}/text/cover.xhtml`, { force: true });
    fs.rmSync(`${path}/css/pdl/cover.css`, { force: true });
    fs.rmSync(`${path}${COVER_NAME}`, { force: true });
  }

  if (!addTitlePage) {
    fs.rmSync(`${path}/text/titlepage.xhtml`, { force: true });
    fs.rmSync(`${path}/css/pdl/titlepage.css`, { force: true });
    fs.rmSync(`${path}${TITLE_NAME}`, { force: true });
  }

  if (!addPublicDomain) {
    fs.rmSync(`${path}/text/public-domain.xhtml`, { force: true });
    fs.rmSync(`${path}/css/pdl/public-domain.css`, { force: true });
  }
}

export function checkAddablePages(
  book: Book,
  sources: ModificationFolders
): AddablePages {
  const { "PD - Title": publicDomainTitle, "PD - Text": publicDomainText } =
    book;
  const AddablePages = {} as AddablePages;
  for (const [source, path] of Object.entries(sources) as [
    BookTypes,
    string,
  ][]) {
    const addCover = fs.existsSync(`${path}${COVER_NAME}`);
    const addTitle = fs.existsSync(`${path}${TITLE_NAME}`);
    const addPublicDomain = !!publicDomainTitle || !!publicDomainText;
    const toc = getToc(addCover, addTitle, addPublicDomain);
    const { contentItems, contentItemRefs } = getContent(
      addPublicDomain,
      addCover,
      addTitle,
      source
    );

    removeUnnecesaryFiles(
      path,
      addCover,
      addTitle,
      addPublicDomain,
      source === "epub"
    );

    AddablePages[source as BookTypes] = {
      toc,
      contentItems,
      contentItemRefs,
      cover: addCover,
      publicDomain: addPublicDomain,
      titlePage: addTitle,
    };
  }

  return AddablePages;
}
