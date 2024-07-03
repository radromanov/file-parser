require("module-alias/register");

import path from "path";
import { Command } from "commander";
import { appendToFile, collect, createPath } from "./shared/utils";
import { traverseDirectory } from "./shared/utils/traverse-directory";

const cli = new Command();

cli
  .requiredOption("-s, --source <string>", "source path to search within")
  .requiredOption(
    "-t, --target <string | string[]>",
    "target word or words to look for (comma/hyphen delimited - e.g. -t word1,word2-word3)",
    collect
  )
  .option("-o, --output <string>", "output directory", "./result.json");

cli.parse(process.argv);

// Exec process
cli.action(() => {
  const { output, target } = cli.opts();
  const source = createPath()[0];

  const results = traverseDirectory(source, target);

  appendToFile(path.resolve(output), results);
});

cli.parse();
