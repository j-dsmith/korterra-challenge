import { FC } from "react";
import { Button } from "./Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  lastPage: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  nextPage: () => void;
  prevPage: () => void;
};

const Pagination: FC<PaginationProps> = ({
  currentPage,
  lastPage,
  hasNextPage,
  hasPrevPage,
  nextPage,
  prevPage,
}) => {
  console.log("nextPage", nextPage);
  console.log("prevPage", prevPage);
  return (
    <div className="flex gap-2 items-center">
      <Button variant="ghost" disabled={!hasPrevPage} onClick={prevPage}>
        <ChevronLeft />
      </Button>
      <span className="text-sm">
        Page {currentPage} of {lastPage}
      </span>
      <Button variant="ghost" disabled={!hasNextPage} onClick={nextPage}>
        <ChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
