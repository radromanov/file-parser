import { ALLOWED_EXTENSIONS } from "../constants";

export function isFile(filepath: string) {
  if (!filepath.includes(".")) return false;

  const ext = filepath.split(".").at(-1);
  if (!ext) return false;

  if (ALLOWED_EXTENSIONS.includes(ext)) return true;

  return false;
}
