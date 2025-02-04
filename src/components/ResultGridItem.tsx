import { truncateText } from "@/lib/utils";
import { Repo } from "@/schemas/repoSchema";
import { FC } from "react";
import { Button } from "./ui/Button";
import { TableRow, TableCell } from "./ui/Table";
import { useNavigate } from "react-router";

type ResultGridItemProps = {
  repo: Repo;
};

const BASE_URL = "/repo/";

const ResultGridItem: FC<ResultGridItemProps> = ({ repo }) => {
  const navigate = useNavigate();

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
        <Button
          onClick={() => navigate(`${BASE_URL}${repo.id}`, { state: { repo } })}
          variant="outline"
        >
          Details
        </Button>
      </TableCell>
    </TableRow>
  );
};
export default ResultGridItem;
