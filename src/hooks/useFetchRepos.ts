import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Repository, repositoriesSchema } from "@/schemas/repoSchema";
import { parseLinkHeader } from "@/lib/utils";
import { ProgrammingLanguage, UseFetchReposResult } from "@/types/types";

const BASE_URL = "https://api.github.com/search/repositories";

export const useFetchRepos = (
  query?: string,
  language: ProgrammingLanguage = "javascript"
): UseFetchReposResult => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [linkHeader, setLinkHeader] = useState<string | null>(null);

  // Cache previous search results
  const cache = useRef<
    Map<string, { repos: Repository[]; linkHeader: string | null }>
  >(new Map());

  // Debounce timeout ref
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchRepos = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Setup cache key
    const cacheKey = `${query}_${language}_${currentPage}`;
    const cachedData = cache.current.get(cacheKey);
    if (cachedData) {
      setRepos(cachedData.repos);
      setLinkHeader(cachedData.linkHeader);
      setLoading(false);
      return;
    }

    // Build the search query
    const searchQuery = query
      ? `${query}+language:${language}`
      : `language:${language}`;
    const url = `${BASE_URL}?q=${encodeURIComponent(
      searchQuery
    )}&per_page=10&page=${currentPage}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `GitHub API error: ${response.status} - ${response.statusText}`
        );
      }

      const linkHeader = response.headers.get("Link");
      setLinkHeader(linkHeader);

      const data = await response.json();
      const parsedData = repositoriesSchema.parse(data);

      // Cache the result
      cache.current.set(cacheKey, { repos: parsedData.items, linkHeader });

      setRepos(parsedData.items);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [language, query, currentPage]);

  // Setup debounce to prevent rapid API calls when pagination is clicked
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      fetchRepos();
    }, 200);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [fetchRepos]);

  // Get booleans for pagination from link header
  const { hasNextPage, hasPrevPage, lastPage } = useMemo(() => {
    if (!linkHeader) {
      return { hasNextPage: false, hasPrevPage: false };
    }

    const links = parseLinkHeader(linkHeader);

    return {
      hasNextPage: !!links.next,
      hasPrevPage: !!links.prev,
      lastPage: links.last ? parseInt(links.last.split("=").pop() || "1") : 1,
    };
  }, [linkHeader]);

  return {
    repos,
    loading,
    error,
    currentPage,
    lastPage: lastPage || 1,
    hasNextPage,
    hasPrevPage,
    nextPage: hasNextPage ? () => setCurrentPage((prev) => prev + 1) : () => {},
    prevPage: hasPrevPage
      ? () => setCurrentPage((prev) => Math.max(1, prev - 1))
      : () => {},
  };
};
