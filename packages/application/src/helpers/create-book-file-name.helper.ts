import { snakeCase } from "lodash";

export function createBookFileName(
  title: string | undefined,
  author: string | undefined,
  ID: string | undefined
): string {
  if (!title || !author || !ID) {
    throw new Error(
      "The title & author or ID are required to create the book file name."
    );
  }

  return snakeCase(`${ID || ""} ${title || ""} ${author || ""}`);
}
