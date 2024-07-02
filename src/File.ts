import { ALLOWED_EXTENSIONS } from "@shared/constants";
import { lstatSync } from "fs";

export class File {
  private filepath: string;

  constructor(
    filepath: string,
    private readonly allowedExtensions: string[] = ALLOWED_EXTENSIONS
  ) {
    this.filepath = filepath;
  }

  isExists() {
    let exists = this.isDirectory();
    if (exists) return exists;

    exists = this.isFile();
    if (exists) return exists;

    return false;
  }

  private isDirectory() {
    try {
      return lstatSync(this.filepath).isDirectory();
    } catch (error) {
      return false;
    }
  }

  private isFile() {
    try {
      return lstatSync(this.filepath).isFile();
    } catch (error) {
      return false;
    }
  }
}
