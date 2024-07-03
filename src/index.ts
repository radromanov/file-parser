require("module-alias/register");

import path from "path";
import { Command } from "commander";
import { appendToFile, collect, createPath } from "./shared/utils";
import { readFileSync, readdirSync, statSync } from "fs";
import { Searcher } from "./Searcher";

function processJsonFile(filePath: string, target: string) {
  // Read and process JSON file
  const fileContent = readFileSync(filePath, "utf-8");
  const jsonData = JSON.parse(fileContent);

  // Perform any specific operations on jsonData here
  const result = Searcher.exec(target, jsonData);
  const all: any = [];

  if (result.length) {
    function recur(obj: any) {
      if (Array.isArray(obj)) {
        for (const item of obj) {
          recur(item);
        }
      } else if (obj && typeof obj == "string") {
        all.push(obj);
      }
    }

    recur(result);
  }

  return all;
}

function traverseDirectory(directoryPath: string, target: string[]) {
  const entries = readdirSync(directoryPath);
  const actualResults: any[] = [];

  for (const entry of entries) {
    const entryPath = path.join(directoryPath, entry);
    const entryStat = statSync(entryPath);

    if (entryStat.isDirectory()) {
      const results = traverseDirectory(entryPath, target);

      if (results.length) {
        actualResults.push(results);
      }
    } else if (entryStat.isFile() && path.extname(entryPath) === ".json") {
      for (const t of target) {
        const res = processJsonFile(entryPath, t);

        if (res.length) {
          if (Array.isArray(res)) {
            actualResults.push(...res);
          } else {
            actualResults.push(...res);
          }
        }
      }
    }
  }

  return actualResults;
}

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
