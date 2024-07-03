import { lstatSync, readFileSync, readdirSync } from "fs";

export class File {
  private filepath: string;

  constructor(filepath: string) {
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
    } else if (this.isDirectory()) {
      const result = readdirSync(this.filepath, "utf-8");

      return result;
    }
  }

  isDirectory() {
    try {
      return lstatSync(this.filepath).isDirectory();
    } catch (error) {
      return false;
    }
  }

  isFile() {
    try {
      return lstatSync(this.filepath).isFile();
    } catch (error) {
      return false;
    }
  }
}
