import { Command } from "commander";

export class CLI {
  private options: { flag: string; description: string }[] = [];

  constructor(private readonly client: Command) {}

  private init() {
    this.client.usage("[ARGUMENTS [...OPTIONS]]");

    return this;
  }

  private addOption(flag: string, description: string) {
    this.options.push({ flag, description });

    for (let opt of this.options) {
      this.client.option(opt.flag, opt.description);
    }

    return this;
  }
}
