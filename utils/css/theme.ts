/**
 * @deprecated - We should probably not do this.
 */
export function getTheme(): "light" | "dark" {
  if (
    globalThis.matchMedia &&
    globalThis.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  return "light";
}