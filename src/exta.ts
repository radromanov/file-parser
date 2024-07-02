#!/usr/bin/env node

import { Command } from "commander";
import path from "path";
import { isValid } from "./shared/utils/is-valid";
import { ACCEPTED_EXT } from "./shared/constants/accepted-extensions";

const cli = new Command();

// Add actions to the CLI
cli
  .usage("[ARGUMENT [...OPTIONS]]")
  .argument("path", "scan the given path")
  .option(
    "-r, --recursive",
    "recursively walk the path if <path> is a directory"
  )
  .action((filepath: string, opts: { recursive: boolean }, ctx: Command) => {
    if (!isValid(filepath)) {
      cli.error(
        `error: invalid file or directory (extension must be '${ACCEPTED_EXT.join(
          " | "
        )}')`
      );
    }

    const args = ctx.args;
    const target = args?.[1];

    if (!target) {
      cli.error("error: target word is required");
    }

    const isFile = filepath.match(/.json/)?.length ? true : false;

    if (!isFile && opts.recursive) {
      console.log("Is recursive and it's a directory!");
      // Get the base path
      // Loop through all dirs and find the target
    }

    const isAbsolute = path.isAbsolute(filepath);
    if (!isAbsolute) cli.error("error: path must be absolute (/path/to/file)");

    const absPath = path.resolve(filepath);

    console.log(`Scanning file or dir: '${absPath}' for word '${target}'`);
  });

// Execute the CLI with the given arguments
cli.parse(process.argv);
