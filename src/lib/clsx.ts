// Tiny classnames helper — joins truthy strings with a space.
export function clsx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}
