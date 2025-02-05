import { FC, useCallback } from "react";

import { UseFetchReposResult } from "@/types/types";
import Pagination from "@/components/ui/Pagination";
import RepoGridItem from "./RepoGridItem";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MobileRepoListItem from "./MobileRepoListItem";

const SearchResults: FC<UseFetchReposResult> = ({
  repos,
  loading,
  error,
  currentPage,
  ...paginationProps
}) => {
  const renderResults = useCallback(() => {
    return (
      <>
        <Table className="hidden grid-cols-[25%,1fr,auto] md:grid">
          <TableHeader className="grid grid-cols-subgrid col-span-3 sticky top-0 bg-white">
            <TableRow className="grid grid-cols-subgrid col-span-3">
              <TableHead className="grid items-center">Repository</TableHead>
              <TableHead className="grid items-center">Description</TableHead>
              <TableHead className="grid items-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="grid grid-cols-subgrid col-span-3">
            {repos.map((repo) => (
              <RepoGridItem repo={repo} key={repo.id} />
            ))}
          </TableBody>
        </Table>
        <>
          {repos.map((repo) => (
            <MobileRepoListItem repo={repo} key={repo.id} />
          ))}
        </>
      </>
    );
  }, [repos]);

  return (
    <section className="flex flex-col max-h-full overflow-hidden gap-4 h-full">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl sm:text-2xl font-semibold">Search Results</h2>
        <Pagination currentPage={currentPage} {...paginationProps} />
      </div>

      {loading ? <p>Loading...</p> : null}
      {!loading && !error ? renderResults() : null}
    </section>
  );
};

export default SearchResults;
