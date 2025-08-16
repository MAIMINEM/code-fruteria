/**
 * Processes an array of numbers by:
 * 1. Filtering out odd numbers
 * 2. Squaring the remaining even numbers
 * 3. Removing duplicates
 * 4. Sorting in ascending order
 *
 * @param numbers - Array of numbers to process
 * @returns Sorted array of unique squares of even numbers
 */
export function processNumbers(numbers: number[]): number[] {
  const uniqueSquares = new Set<number>();

  numbers.forEach((number) => {
    if (isEven(number)) {
      const square = calculateSquare(number);
      uniqueSquares.add(square);
    }
  });

  return Array.from(uniqueSquares).sort((a, b) => a - b);
}

/**
 * Checks if a number is even
 * Using bitwise AND for performance as it's faster than modulo
 */
function isEven(number: number): boolean {
  return (number & 1) === 0;
}

/**
 * Calculates the square of a number
 */
function calculateSquare(number: number): number {
  return number * number;
}
