import * as prettier from "prettier";

type Parser = "html" | "xml";

export async function pretifyData(
  data: string,
  parser: Parser
): Promise<string> {
  return await prettier.format(data, {
    parser,
    plugins: ["@prettier/plugin-xml"],
    ...(parser === "xml"
      ? { xmlWhitespaceSensitivity: "ignore", printWidth: 100000 }
      : {}),
  });
}
