import * as fs from "fs";

interface BookSrc {
  epub: string;
  kepub: string;
  azw3: string;
}

export function cleanBookSrc(bookPath: string): BookSrc {
  const bookSrc: BookSrc = {
    epub: `${bookPath}/src-epub`,
    kepub: `${bookPath}/src-kepub`,
    azw3: `${bookPath}/src-azw3`,
  };

  for (const src of Object.keys(bookSrc) as (keyof BookSrc)[]) {
    if (fs.existsSync(bookSrc[src])) {
      fs.rmSync(bookSrc[src], { recursive: true, force: true });
    }
    fs.mkdirSync(bookSrc[src], { recursive: true });
  }

  return bookSrc;
}
