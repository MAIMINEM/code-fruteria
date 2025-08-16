import { processNumbers } from "./processNumbers";

describe("processNumbers", () => {
  it("keeps only even numbers, squares them, de-dupes, sorts", () => {
    expect(processNumbers([1, 2, 2, 3, 4, 5])).toEqual([4, 16]);
  });

  it("handles negatives and zeros", () => {
    expect(processNumbers([0, -2, -3, 4])).toEqual([0, 4, 16]);
  });

  it("handles empty input", () => {
    expect(processNumbers([])).toEqual([]);
  });

  it("is stable on large inputs (sanity)", () => {
    const big = Array.from({ length: 100_000 }, (_, i) => i % 250);
    const res = processNumbers(big);
    expect(res[0]).toBe(0);
    expect(res[res.length - 1]).toBe(248 * 248); // last even < 250 is 248
  });
});
