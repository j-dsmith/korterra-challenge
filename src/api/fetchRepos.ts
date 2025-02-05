import { repositoriesSchema } from "@/schemas/repoSchema";
import { Repository } from "@/schemas/repoSchema";

const BASE_URL = "https://api.github.com/search/repositories";

/**
 * Fetches repositories from the GitHub API
 * @param query - The search query
 * @param language - The programming language to filter by
 * @param currentPage - The current page number
 * @param signal - The AbortSignal instance to cancel the request
 * @returns Repositories and the link header
 */
export const fetchRepos = async (
  query: string,
  language: string,
  currentPage: number,
  signal: AbortSignal
): Promise<{ repos: Repository[]; linkHeader: string | null }> => {
  const searchQuery = query
    ? `${query}+language:${language}`
    : `language:${language}`;

  const url = `${BASE_URL}?q=${encodeURIComponent(
    searchQuery
  )}&per_page=25&page=${currentPage}`;

  const response = await fetch(url, {
    signal,
    headers: {},
  });

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} - ${response.statusText}`
    );
  }

  const linkHeader = response.headers.get("Link");
  const data = await response.json();
  const parsedData = repositoriesSchema.parse(data);

  return { repos: parsedData.items, linkHeader };
};
