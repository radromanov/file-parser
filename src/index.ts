require("module-alias/register");

import path from "path";
import { Command } from "commander";
import { File } from "./File";
import { Searcher } from "./Searcher";
import { ALLOWED_EXTENSIONS } from "./shared/constants";
import { appendToFile, createPath } from "./shared/utils";

const cli = new Command();

cli
  .requiredOption("-s, --source <string>", "source path to search within")
  .requiredOption("-t, --target <string>", "target word to look for")
  .option("-o, --output <string>", "output directory", "./result.json");

cli.parse(process.argv);

// Exec process
cli.action(() => {
  const { output, target } = cli.opts();
  const source = createPath()[0];
  const outputPath = path.resolve(output);

  const fileHandler = new File(source);
  const data = fileHandler.read();

  if (fileHandler.isFile()) {
    const results = Searcher.exec(target, data);

    appendToFile(outputPath, results);
  } else if (fileHandler.isDirectory()) {
    for (const item of data) {
      const itemPath = path.join(source, item);
      const ext = path.extname(item).substring(1);

      if (ALLOWED_EXTENSIONS.includes(ext)) {
        const content = new File(itemPath).read();
        const results = Searcher.exec(target, content);
        appendToFile(outputPath, results);
      }
    }
  }
});

cli.parse();
