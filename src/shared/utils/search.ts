import { readFileSync } from "fs";
import { isFile } from "./is-file";
import { ALLOWED_EXTENSIONS } from "../constants";

export function search(filepath: string, target: string) {
  if (!isFile(filepath)) {
    throw Error(
      `error: please provide a valid file extension (${ALLOWED_EXTENSIONS.join(
        " | "
      )})`
    );
  }

  const file = readFileSync(filepath, "utf-8");
  const json = JSON.parse(file);

  if (typeof json === "object") {
    const values = json[target];

    if (values) {
      return values;
    }

    const items = [];

    for (let key of Object.keys(json)) {
      const isArray = json[key].length > 0;

      if (isArray) {
        for (const item of json[key]) {
          const rating: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE" =
            item[target];
          items.push(rating);
        }
      }
    }

    return items;
  }
}
