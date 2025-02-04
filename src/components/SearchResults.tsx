import { FC, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/Table";

import { Button } from "./ui/Button";
import { UseFetchReposResult } from "@/types/types";
import Pagination from "./ui/Pagination";
import { truncateText } from "@/lib/utils";
import ResultGridItem from "./ResultGridItem";

const SearchResults: FC<UseFetchReposResult> = ({
  repos,
  loading,
  error,
  ...paginationProps
}) => {
  const renderResults = useCallback(() => {
    return repos.map((repo) => <ResultGridItem repo={repo} key={repo.id} />);
  }, [repos]);

  return (
    <section className="flex flex-col max-h-full overflow-hidden gap-4 h-full">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-semibold">Search Results</h2>
        <Pagination {...paginationProps} />
      </div>
      {/* TODO: update loader */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table className="grid grid-cols-[25%,1fr,auto]">
          <TableHeader className="grid grid-cols-subgrid col-span-3 sticky top-0 bg-white">
            <TableRow className="grid grid-cols-subgrid col-span-3">
              <TableHead className="grid items-center">Repository</TableHead>
              <TableHead className="grid items-center">Description</TableHead>
              <TableHead className="grid items-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="grid grid-cols-subgrid col-span-3">
            {renderResults()}
          </TableBody>
        </Table>
      )}
    </section>
  );
};

export default SearchResults;
