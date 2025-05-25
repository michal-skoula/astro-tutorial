import { expect, test } from "vitest";
import { isExternal } from "../src/util/isExternal";

const baseUrlHost = "example.com";

test("returns false for same origin URLs", () => {
  expect(isExternal("https://example.com/page", baseUrlHost)).toBe(false);
  expect(isExternal("https://example.com", baseUrlHost)).toBe(false);
  expect(isExternal("http://example.com", baseUrlHost)).toBe(false); // different protocol
  expect(isExternal("https://example.com:443", baseUrlHost)).toBe(false);
  expect(isExternal("https://sub.example.com", baseUrlHost)).toBe(false); // subdomain different origin
  expect(isExternal("https://example.com:8443", baseUrlHost)).toBe(false); // different port
});

test("returns true for different origins", () => {
  expect(isExternal("https://google.com", baseUrlHost)).toBe(true);
  expect(isExternal("http://google.com", baseUrlHost)).toBe(true);
});

test("returns false for relative URLs", () => {
  expect(isExternal("/some/path", baseUrlHost)).toBe(false);
  expect(isExternal("about", baseUrlHost)).toBe(false);
});

test("returns false for invalid URLs", () => {
  expect(isExternal("not a url", baseUrlHost)).toBe(false);
  expect(isExternal("", baseUrlHost)).toBe(false);
});

test("returns false if currentUrl is empty or null", () => {
  // @ts-ignore
  expect(isExternal(null, baseUrlHost)).toBe(false);
  // @ts-ignore
  expect(isExternal(undefined, baseUrlHost)).toBe(false);
});
