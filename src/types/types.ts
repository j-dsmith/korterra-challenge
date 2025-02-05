import { Repository } from "@/schemas/repoSchema";

// Programming languages supported by search API
export type ProgrammingLanguage = "javascript" | "typescript" | "c#";

// Return type of useFetchRepos hook
export type UseFetchReposResult = {
  repos: Repository[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: () => void;
  prevPage: () => void;
};

// Repo Detail Icon type
export type RepoDetailIconType = "star" | "fork" | "issue" | "license";
