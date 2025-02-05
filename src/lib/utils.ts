import { clsx, type ClassValue } from "clsx";
import EmojiConvertor from "emoji-js";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Parses the Link header from an HTTP response and returns an object
 * mapping link relation types to their corresponding URLs.
 *
 * @param header - The Link header string to parse.
 * @returns An object where the keys are link relation types (e.g., "next", "prev")
 * and the values are the corresponding URLs.
 */
export function parseLinkHeader(header: string) {
  const links: Record<string, string> = {};
  header.split(",").forEach((part) => {
    const match = part.match(/<([^>]+)>;\s*rel="([^"]+)"/);
    if (match) {
      const [, url, rel] = match;
      links[rel] = url;
    }
  });
  return links;
}

/**
 * Truncates a string to a specified length and appends an ellipsis if the string
 * @param text - The text to truncate.
 * @param maxLength - The maximum length of the truncated text.
 * @returns The truncated text.
 */
export const truncateText = (text: string, maxLength = 350): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
};

// Emoji
const emoji = new EmojiConvertor();
emoji.replace_mode = "unified";
emoji.allow_native = true;

/**
 * Converts emoji shortcodes (e.g., ":smile:") in a string to Unicode emoji characters.
 * @param text - The text to convert.
 * @returns The text with emoji shortcodes replaced with Unicode emoji characters.
 */
export const convertEmojiShortcode = (text: string): string => {
  return emoji.replace_colons(text);
};
