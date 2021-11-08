import { stripIndents } from "common-tags";

export { stripIndents };

export function dateToDiscordTimestamp(
  date: Date | number,
  format?: DISCORD_TIME_TYPES
): string {
  const value = date instanceof Date ? Math.floor(date.getTime() / 1000) : date;

  return `<t:${value}${format ? `:${DISCORD_TIME_FORMATS[format]}` : ""}>`;
}

/**
 *
 * @param text to convert to code block
 * @param lang of the code block formate
 * @returns codeblock
 */
export function codeblock(text: string | number, lang?: string): string {
  return `\`\`\`${lang}\n${text}\`\`\``;
}
/**
 * Similar to code block but no language specific formatting
 * @param text to convert to code block
 * @returns oneblock
 */
export function oneblock(text: string | number | void): string {
  return `\`${text}\``;
}

/*
 ** Filters out a markdown code block from the input and returns only the code.
 ** If a code block isn't found then it will return the input unmodified.
 */
export function filterCodeBlock(input: string): string {
  const trimmed = input.trim();

  if (
    (trimmed.startsWith("```ts") || trimmed.startsWith("```js")) &&
    trimmed.endsWith("```")
  ) {
    return trimmed.substring(5, trimmed.length - 3);
  } else if (
    (trimmed.startsWith("```typescript") ||
      trimmed.startsWith("```javascript")) &&
    trimmed.endsWith("```")
  ) {
    return trimmed.substring(13, trimmed.length - 3);
  } else if (trimmed.startsWith("```") && trimmed.endsWith("```")) {
    return trimmed.substring(3, trimmed.length - 3);
  }

  return input;
}

/**
 * Util for str const
 */

export const DISCORD_TIME_FORMATS = {
  "Short Time": "t",
  "Long Time": "T",
  "Short Date": "d",
  "Long Date": "D",
  "Short Date/Time": "f",
  "Long Date/Time": "F",
  "Relative Time": "R",
};

export type DISCORD_TIME_TYPES = keyof typeof DISCORD_TIME_FORMATS;

export function generateKey() {
  const characters = "ABCEFGHJKLNPQRSTUWXYZ1245780";
  let output = "";

  for (let i = 0; i < 5; i += 1) {
    for (let y = 0; y < 4; y += 1) {
      // eslint-disable-next-line no-mixed-operators
      const random = Math.floor(Math.random() * 35 + 1);
      const char = characters.charAt(random);
      output += char;
    }

    if (i !== 5) output += "-";
  }

  return output;
}

export function longDate(date: string) {
  return new Date(date).toLocaleString("en-GB", { dateStyle: "full" });
}

export function shortDate(date: number | Date | undefined) {
  return new Intl.DateTimeFormat("en-GB").format(date);
}

export function trim(str: string, max: number) {
  if (!str)
    throw new TypeError(
      "Trim Function Error -  Must define the string to trim"
    );
  if (!max)
    throw new TypeError("Trim Function Error - Must define how much to trim");
  // eslint-disable-next-line no-unused-expressions
  str.length > max ? `${str.slice(0, max)}...` : str;
}
