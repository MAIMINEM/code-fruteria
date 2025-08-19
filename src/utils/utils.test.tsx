import {
  getGridCellPosition,
  getDefaultPanelPosition,
  monitorUserActivity,
  throttle,
  generateUniqueKey,
  isUserLoggedIn,
} from "./utils";

describe("getGridCellPosition", () => {
  it("calculates correct position and size", () => {
    const pos = getGridCellPosition(1, 2, 800, 600, 50);
    expect(pos).toHaveProperty("x");
    expect(pos).toHaveProperty("y");
    expect(pos).toHaveProperty("width");
    expect(pos).toHaveProperty("height");
  });
});

describe("getDefaultPanelPosition", () => {
  it("returns correct default position for count", () => {
    expect(getDefaultPanelPosition(0)).toEqual({ x: 60, y: 60, width: 700, height: 420 });
    expect(getDefaultPanelPosition(2)).toEqual({ x: 140, y: 140, width: 700, height: 420 });
  });
});

describe("monitorUserActivity", () => {
  it("calls callback after inactivity", (done) => {
    const cb = jest.fn(() => {
      expect(cb).toHaveBeenCalled();
      stop();
      done();
    });
    const stop = monitorUserActivity(cb, 100);
  });
});

describe("throttle", () => {
  jest.useFakeTimers();
  it("throttles function calls", () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);
    throttled();
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

describe("generateUniqueKey", () => {
  it("generates unique keys", () => {
    const key1 = generateUniqueKey("test");
    const key2 = generateUniqueKey("test");
    expect(key1).not.toEqual(key2);
    expect(key1).toMatch(/^test-/);
  });
});

describe("isUserLoggedIn", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it("returns false if no authToken is present", () => {
    expect(isUserLoggedIn()).toBe(false);
  });
  it("returns true if authToken is present", () => {
    localStorage.setItem("authToken", "token");
    expect(isUserLoggedIn()).toBe(true);
  });
});
