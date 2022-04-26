import {fibonacci} from "@/fibonacci";

describe("fibonacci", () => {
  it("The zeroth value is 0", () => {
    expect(fibonacci(0)).toBe(0);
  });
  it("The first value is 1", () => {
    expect(fibonacci(1)).toBe(1);
  });
  it("The second value is 1", () => {
    expect(fibonacci(2)).toBe(1);
  });
  it("The 8th value is 21", () => {
    expect(fibonacci(8)).toBe(21);
  });
  it("The 11th value is 89", () => {
    expect(fibonacci(11)).toBe(89);
  });
});
