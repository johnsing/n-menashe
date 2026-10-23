import { describe, expect, it } from "vitest";
import {
  ALL_PRESET_LOCATIONS,
  DEFAULT_LOCATION,
  findPresetLocation,
  isCurrentLocation,
  locationFromCoords,
  PRESET_LOCATIONS,
} from "./zmanimLocations";

describe("zmanimLocations", () => {
  it("defaults to Jerusalem", () => {
    expect(DEFAULT_LOCATION.id).toBe("jerusalem");
  });

  it("every preset has a unique id", () => {
    const ids = ALL_PRESET_LOCATIONS.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every preset location carries a Hebcal query fragment", () => {
    for (const group of PRESET_LOCATIONS) {
      for (const loc of group.locations) {
        expect(loc.params).toMatch(/^(geonameid=\d+|latitude=.+&longitude=.+)$/);
      }
    }
  });

  // Regression guard: Nazareth once had Tel Aviv's geonameid (copy-paste).
  it("nazareth does not reuse telaviv's geonameid", () => {
    const nazareth = findPresetLocation("nazareth");
    const telaviv = findPresetLocation("telaviv");
    expect(nazareth).toBeDefined();
    expect(nazareth!.params).not.toBe(telaviv!.params);
    expect(nazareth!.params).toBe("geonameid=294098");
  });

  it("findPresetLocation returns undefined for unknown ids", () => {
    expect(findPresetLocation("atlantis")).toBeUndefined();
  });

  it("locationFromCoords builds a Hebcal lat/lon query", () => {
    const loc = locationFromCoords(31.7683, 35.2137);
    expect(loc.id).toBe("current");
    expect(isCurrentLocation(loc)).toBe(true);
    expect(loc.params).toContain("latitude=31.7683");
    expect(loc.params).toContain("longitude=35.2137");
  });
});
