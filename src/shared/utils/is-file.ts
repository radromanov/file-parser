import { ALLOWED_EXT } from "../constants/accepted-extensions";

export function isFile(filepath: string) {
  if (!filepath.includes(".")) return false;

  const ext = filepath.split(".").at(-1);
  if (!ext) return false;

  if (ALLOWED_EXT.includes(ext)) return true;

  return false;
}
