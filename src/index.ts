require("module-alias/register");

import path from "path";
import { Command } from "commander";
import { File } from "./File";
import { Searcher } from "./Searcher";
import { ALLOWED_EXTENSIONS } from "./shared/constants";
import { appendToFile, collect, createPath } from "./shared/utils";

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
  console.log(target);

  const source = createPath()[0];
  const outputPath = path.resolve(output);

  const fileHandler = new File(source);
  const data = fileHandler.read();

  if (fileHandler.isFile()) {
    for (const t of target) {
      const results = Searcher.exec(t, data);
      appendToFile(outputPath, results);
    }
  } else if (fileHandler.isDirectory()) {
    for (const item of data) {
      const itemPath = path.join(source, item);
      const ext = path.extname(item).substring(1);

      if (ALLOWED_EXTENSIONS.includes(ext)) {
        const content = new File(itemPath).read();

        for (const t of target) {
          const results = Searcher.exec(t, content);
          appendToFile(outputPath, results);
        }
      }
    }
  }
});

cli.parse();
