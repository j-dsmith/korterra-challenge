import { convertEmojiShortcode, truncateText } from "@/lib/utils";
import { Repository } from "@/schemas/repoSchema";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { TableCell, TableRow } from "@/components/ui/table";

type RepoGridItemProps = {
  repo: Repository;
};

const BASE_URL = "/repo/";

const RepoGridItem: FC<RepoGridItemProps> = ({ repo }) => {
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
        <Button variant="link" asChild className="p-0 w-fit">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            {repo.name}
          </a>
        </Button>
      </TableCell>

      <TableCell className="grid items-center text-muted-foreground">
        {truncateText(convertEmojiShortcode(repo.description ?? ""))}
      </TableCell>
      <TableCell className="grid place-items-center">
        <Button onClick={handleNavigate} variant="outline">
          Details
        </Button>
      </TableCell>
    </TableRow>
  );
};
export default RepoGridItem;
