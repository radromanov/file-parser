import { readdirSync, statSync } from "fs";
import path from "path";
import { processFile } from "./process-file";

export function traverseDirectory(directoryPath: string, target: string[]) {
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
        const res = processFile(entryPath, t);

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
