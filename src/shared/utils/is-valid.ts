import { ALLOWED_EXT } from "../constants/accepted-extensions";

export function isValid(filepath: string) {
  if (filepath.includes(".")) {
    // There is a file extension, check if it's a valid one
    const ext = filepath.split(".").at(-1);

    if (!ext) {
      return false;
    }

    if (ALLOWED_EXT.includes(ext)) {
      return true;
    }

    return false;
  }

  return true;
}
