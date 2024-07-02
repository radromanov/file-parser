export function average(numbers: number[]) {
  if (numbers.length === 0) return 0; // Handle empty array case

  const sum = numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const average = sum / numbers.length;
  return average;
}
