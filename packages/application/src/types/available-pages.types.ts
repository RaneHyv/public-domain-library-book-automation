export type AvailablePageNames = "cover" | "publicDomain" | "titlePage";
export type AvailablePageInfo = "contentItemRefs" | "contentItems" | "toc";
export type AvailablePage = Record<AvailablePageInfo, string> &
  Record<AvailablePageNames, boolean>;
