import { Searcher } from "@/Searcher";
import { readFileSync } from "fs";

export function processFile(filePath: string, target: string) {
  // Read and process JSON file
  const fileContent = readFileSync(filePath, "utf-8");
  const jsonData = JSON.parse(fileContent);

  // Perform any specific operations on jsonData here
  const result = Searcher.exec(target, jsonData);
  const data: any = [];

  if (result.length) {
    function recur(obj: any) {
      if (Array.isArray(obj)) {
        for (const item of obj) {
          recur(item);
        }
      } else if (
        (obj && typeof obj == "string") ||
        (obj && typeof obj === "object") ||
        (obj && typeof obj === "number")
      ) {
        data.push(obj);
      }
    }

    recur(result);
  }

  return data;
}
