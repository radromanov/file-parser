import { readFileSync, writeFileSync } from "fs";

export function readOrCreateFile(filePath: string): any[] {
  try {
    const fileContent = readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch {
    writeFileSync(filePath, JSON.stringify([]), "utf-8");
    return [];
  }
}
