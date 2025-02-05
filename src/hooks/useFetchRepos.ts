import { useEffect, useCallback, useReducer, useRef, useMemo } from "react";
import { Repository } from "@/schemas/repoSchema";
import { parseLinkHeader } from "@/lib/utils";
import { ProgrammingLanguage, UseFetchReposResult } from "@/types/types";
import { fetchRepos } from "@/api/fetchRepos";

// Define the shape of the state
type State = {
  repos: Repository[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  linkHeader: string | null;
};

// Define the possible actions that can be dispatched to the reducer
type Action =
  | { type: "FETCH_START" }
  | {
      type: "FETCH_SUCCESS";
      payload: { repos: Repository[]; linkHeader: string | null };
    }
  | { type: "FETCH_FAILURE"; payload: string }
  | { type: "SET_PAGE"; payload: number };

// Define the initial state
const initialState: State = {
  repos: [],
  loading: true,
  error: null,
  currentPage: 1,
  linkHeader: null,
};

// Define the reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        repos: action.payload.repos,
        linkHeader: action.payload.linkHeader,
      };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

export const useFetchRepos = (
  query?: string,
  language: ProgrammingLanguage = "javascript"
): UseFetchReposResult => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { repos, loading, error, currentPage, linkHeader } = state;

  // Cache to store the fetched data
  const cache = useRef<
    Map<string, { repos: Repository[]; linkHeader: string | null }>
  >(new Map());

  // Fetch repos callback
  const fetchReposCallback = useCallback(async () => {
    dispatch({ type: "FETCH_START" });

    // Generate a cache key based on the query, language, and current page
    const cacheKey = `${query}_${language}_${currentPage}`;
    const cachedData = cache.current.get(cacheKey);
    if (cachedData) {
      // If the data is cached, return it and exit early
      dispatch({
        type: "FETCH_SUCCESS",
        payload: cachedData,
      });
      return;
    }

    // Create an AbortController to cancel the fetch if needed
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      // Fetch the repositories
      const { repos, linkHeader } = await fetchRepos(
        query || "",
        language,
        currentPage,
        signal
      );
      // Cache the fetched data
      cache.current.set(cacheKey, { repos, linkHeader });
      dispatch({
        type: "FETCH_SUCCESS",
        payload: { repos, linkHeader },
      });
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        dispatch({
          type: "FETCH_FAILURE",
          payload: error instanceof Error ? error.message : "An error occurred",
        });
      }
    }
  }, [query, language, currentPage]);

  // Fetch repos on initial render and when the query or language changes, debounced by 200ms
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchReposCallback();
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [fetchReposCallback]);

  // Get the pagination state from the link header
  const { hasNextPage, hasPrevPage, lastPage } = useMemo(() => {
    if (!linkHeader) {
      return { hasNextPage: false, hasPrevPage: false, lastPage: 1 };
    }

    // Parse the link header to get the pagination info
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
    nextPage: hasNextPage
      ? () => dispatch({ type: "SET_PAGE", payload: currentPage + 1 })
      : () => {},
    prevPage: hasPrevPage
      ? () =>
          dispatch({ type: "SET_PAGE", payload: Math.max(1, currentPage - 1) })
      : () => {},
  };
};
