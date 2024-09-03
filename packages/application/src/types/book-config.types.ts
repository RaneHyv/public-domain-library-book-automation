export type BookConfigs = {
  github: string;
  folderPath: string;
  creationAssetsFolder: string;
  gitFolderPath: string;
  azw3: string;
  epub: string;
  kepub: string;
  name: string;
}[];

export type BookTypes = "azw3" | "epub" | "kepub";
export type BookModificationInfo = Record<BookTypes, string>;
