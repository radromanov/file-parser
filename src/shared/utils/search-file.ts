import { readFileSync } from "fs";
import { isValid } from "./is-valid";
import { ALLOWED_EXT } from "../constants/accepted-extensions";

export function searchFile(filepath: string) {
  if (!isValid(filepath)) {
    throw Error(
      `error: please provide a valid file extension (${ALLOWED_EXT.join(
        " | "
      )})`
    );
  }

  const file = readFileSync(filepath, "utf-8");
  const json = JSON.parse(file);

  if (typeof json !== "object") {
    throw Error("Invalid");
  }

  console.log("file contents here", json);

  return json;
}
