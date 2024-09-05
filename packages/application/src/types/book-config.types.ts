export type BookConfigFileKeys =
  | "Author(s)"
  | "ID"
  | "Lang"
  | "PD - Text"
  | "PD - Title"
  | "PDL Author"
  | "PDL book"
  | "StandardEbooks Github"
  | "Title"
  | "Translator(s)";

export type Book = Record<BookConfigFileKeys, string>;

export type Books = Book[];

export type BookTypes = "azw3" | "epub" | "kepub";

export type ModificationFolders = Record<BookTypes, string>;

export interface BookFolders extends Record<BookTypes, string> {
  base: string;
  assets: string;
  git: string;
}
