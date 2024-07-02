import { ALLOWED_EXTENSIONS } from "@shared/constants";
import { lstatSync, readFileSync } from "fs";

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

  read() {
    if (this.isFile()) {
      const result = readFileSync(this.filepath, "utf-8");

      try {
        return JSON.parse(result);
      } catch (error) {
        return null;
      }
    }
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
