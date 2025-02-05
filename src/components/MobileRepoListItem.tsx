import { Repository } from "@/schemas/repoSchema";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { convertEmojiShortcode } from "@/lib/utils";
import { useNavigate } from "react-router";
import ChipLabel from "@/components/ui/ChipLabel";
import { ProgrammingLanguage } from "@/types/types";

type MobileRepoListItemProps = {
  repo: Repository;
};

const BASE_URL = "/repo/";

const MobileRepoListItem: FC<MobileRepoListItemProps> = ({ repo }) => {
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
    <article className="border p-4 md:p-6 rounded-lg md:hidden flex flex-col md:flex-row justify-between gap-4 md:gap-6 items-center">
      <div className="flex flex-col self-stretch">
        <div className="flex items-center gap-2">
          <Button variant="link" className="text-lg w-fit p-0" asChild>
            <a href={repo.html_url}>{repo.name}</a>
          </Button>
          {repo.language ? (
            <ChipLabel
              variant={repo.language.toLowerCase() as ProgrammingLanguage}
              size="sm"
            >
              <span>{repo.language}</span>
            </ChipLabel>
          ) : null}
        </div>
        <p className="text-sm text-muted-foreground">
          {convertEmojiShortcode(repo.description ?? "")}
        </p>
      </div>
      <Button
        variant="secondary"
        onClick={handleNavigate}
        className="w-full md:w-fit"
      >
        Details
      </Button>
    </article>
  );
};

export default MobileRepoListItem;
