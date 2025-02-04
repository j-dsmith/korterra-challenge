import { clsx, type ClassValue } from "clsx";
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
