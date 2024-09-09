import * as cheerio from "cheerio";
import * as prettier from "prettier";

type Parser = "html" | "xml";

function aTagException(formattedData: string): string {
  const $ = cheerio.load(formattedData, { xmlMode: true });

  $("a").each((_, element) => {
    const $element = $(element);
    const innerHTML = $element.html()?.replace(/\n\s*/gu, " ");
    if (innerHTML !== undefined) {
      $element.html(innerHTML);
    }
  });

  return $.html();
}

export async function pretifyData(
  data: string,
  parser: Parser,
  alterCut = false
): Promise<string> {
  const formattedData = await prettier.format(data, {
    parser,
    plugins: ["@prettier/plugin-xml"],
    ...(parser === "xml"
      ? { xmlWhitespaceSensitivity: "ignore", printWidth: 100000 }
      : {}),
  });

  return alterCut ? aTagException(formattedData) : formattedData;
}
