import * as _ from "lodash";

export function createBookFileName(
  title: string | undefined,
  author: string | undefined
): string {
  if (!title || !author) {
    throw new Error(
      "The title and author are required to create the book file name."
    );
  }

  return _.snakeCase(`${title} ${author}`);
}
