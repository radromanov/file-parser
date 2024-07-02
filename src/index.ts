require("module-alias/register");

import { Command } from "commander";
import { File } from "./File";

const cli = new Command();

cli
  .command("search")
  .argument("path", "path to file")
  .action(() => {
    const file = process.argv.slice(3).join(" ");
    const f = new File(file);
    console.log(f.isExists());
  });

cli.parse(process.argv);
