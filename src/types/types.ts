import { Repo } from "@/schemas/repoSchema";

// Programming languages supported by search API
export type ProgrammingLanguage = "javascript" | "typescript" | "csharp";

// Return type of useFetchRepos hook
export type UseFetchReposResult = {
  repos: Repo[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: () => void;
  prevPage: () => void;
};
