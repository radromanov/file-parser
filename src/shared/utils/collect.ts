export function collect(val: string) {
  const values = val.split(/-|,/);

  return values;
}
