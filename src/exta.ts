#!/usr/bin/env node

import { Command } from "commander";
import { isFile } from "./shared/utils/is-file";
import { readdirSync } from "fs";
import path from "path";
import { search } from "./shared/utils/search";
import { average } from "./shared/utils/average";

const cli = new Command();

// Add actions to the CLI
cli.argument("file", "file to scan").action(() => {
  const file = process.argv.slice(2).join(" ");

  if (!file) {
    return cli.error("error: please provide a valid file");
  }

  if (!isFile(file)) {
    return cli.error("error: please provide a valid file extension");
  }

  const address = search(file, "storefrontAddress");

  const dir = path.dirname(file);
  const files = readdirSync(dir);

  let stars = [];

  if (files.includes("reviews.json")) {
    const reviews = search(dir + "/reviews.json", "starRating");

    for (let review of reviews) {
      switch (review) {
        case "TWO":
          stars.push(2);
          break;
        case "THREE":
          stars.push(3);
          break;
        case "FOUR":
          stars.push(4);
          break;
        case "FIVE":
          stars.push(5);
          break;
        default:
          stars.push(1);
          break;
      }
    }
  }

  console.log({
    [address.locality]: {
      [address.addressLines]: average(stars),
    },
  });
});

// Execute the CLI with the given arguments
cli.parse(process.argv);
