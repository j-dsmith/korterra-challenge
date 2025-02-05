import { truncateText } from "@/lib/utils";
import { Repository } from "@/schemas/repoSchema";
import { FC } from "react";
import { Button } from "./ui/Button";
import { TableRow, TableCell } from "./ui/Table";
import { useNavigate } from "react-router";

type ResultGridItemProps = {
  repo: Repository;
};

const BASE_URL = "/repo/";

const ResultGridItem: FC<ResultGridItemProps> = ({ repo }) => {
  const navigate = useNavigate();

  /**
   * Navigate to the details page of the repository with
   * the given ID. Pass the cached repository object as state.
   */
  const handleNavigate = () => {
    navigate(`${BASE_URL}${repo.id}`, {
      state: { repo },
    });
  };

  return (
    <TableRow key={repo.id} className="grid grid-cols-subgrid col-span-3">
      <TableCell className="grid items-center">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {repo.name}
        </a>
      </TableCell>

      <TableCell className="grid items-center">
        {truncateText(repo.description ?? "")}
      </TableCell>
      <TableCell className="grid place-items-center">
        <Button onClick={handleNavigate} variant="outline">
          Details
        </Button>
      </TableCell>
    </TableRow>
  );
};
export default ResultGridItem;
