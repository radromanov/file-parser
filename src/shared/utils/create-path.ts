export function createPath() {
  return process.argv
    .slice(3)
    .join(" ")
    .split(" -t" || " --target");
}
