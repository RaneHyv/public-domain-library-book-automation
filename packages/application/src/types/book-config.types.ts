export interface BookConfig {
  github: string;
  folderPath: string;
  creationAssetsFolder: string;
  gitFolderPath: string;
  azw3: string;
  epub: string;
  kepub: string;
  name: string;
  publicDomaiPageTitle: string;
  publicDomaiPageContent: string;
}

export type BookConfigs = BookConfig[];

export type BookTypes = "azw3" | "epub" | "kepub";
export type BookModificationInfo = Record<BookTypes, string>;
