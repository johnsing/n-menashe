import { describe, expect, it } from "vitest";
import { formatCountdown, getWifiStatus } from "./wifiStatus";

const NOW = new Date("2026-10-23T12:00:00");

describe("getWifiStatus", () => {
  it("returns yellow when more than 5 minutes before the event", () => {
    expect(getWifiStatus(new Date("2026-10-23T12:06:00"), NOW)).toBe("yellow");
  });

  it("returns green when 5 minutes or less before the event", () => {
    expect(getWifiStatus(new Date("2026-10-23T12:05:00"), NOW)).toBe("green");
    expect(getWifiStatus(new Date("2026-10-23T12:01:00"), NOW)).toBe("green");
  });

  it("returns red shortly after the event (within 24h)", () => {
    expect(getWifiStatus(new Date("2026-10-23T11:59:00"), NOW)).toBe("red");
    expect(getWifiStatus(new Date("2026-10-22T12:00:00"), NOW)).toBe("red");
  });

  it("resets to yellow more than 24 hours after the event", () => {
    expect(getWifiStatus(new Date("2026-10-22T11:59:00"), NOW)).toBe("yellow");
  });

  it("accepts ISO strings as well as Date objects", () => {
    expect(getWifiStatus("2026-10-23T12:03:00", NOW)).toBe("green");
  });
});

describe("formatCountdown", () => {
  it("returns 'Departed' for past events", () => {
    expect(formatCountdown(new Date("2026-10-23T11:59:00"), NOW)).toBe(
      "Departed",
    );
    expect(formatCountdown(NOW, NOW)).toBe("Departed");
  });

  it("formats minutes under an hour", () => {
    expect(formatCountdown(new Date("2026-10-23T12:07:00"), NOW)).toBe("7 min");
  });

  it("formats whole hours without remainder", () => {
    expect(formatCountdown(new Date("2026-10-23T15:00:00"), NOW)).toBe("3h");
  });

  it("formats hours with a minute remainder", () => {
    expect(formatCountdown(new Date("2026-10-23T13:30:00"), NOW)).toBe(
      "1h 30m",
    );
  });
});
