import { writeFileSync } from "fs";
import { readOrCreateFile } from "./read-or-create-file";

export function appendToFile(filePath: string, results: any[]): void {
  const existingData = readOrCreateFile(filePath);
  if (results.length) {
    existingData.push(...results);
    writeFileSync(filePath, JSON.stringify(existingData, null, 2), "utf-8");
  }
}
