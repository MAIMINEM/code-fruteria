// fake functions that to add testing before refactor the code.
export function processNumbers(input: number[]): number[] {
  // Single pass → Set for de-dupe → sort at end
  const set = new Set<number>();
  for (let i = 0; i < input.length; i++) {
    const n = input[i];
    // branch prediction tends to favor simple checks
    if ((n & 1) === 0) set.add(n * n);
  }
  return Array.from(set).sort((a, b) => a - b);
}
