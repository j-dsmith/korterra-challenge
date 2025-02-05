import { ProgrammingLanguage } from "@/types/types";
import { FC, ReactNode } from "react";
import RepoMetric from "./RepoMetric";
import { Button } from "@/components/ui/button";
import ChipLabel from "@/components/ui/ChipLabel";
import { Repository } from "@/schemas/repoSchema";
import { convertEmojiShortcode } from "@/lib/utils";

type RepoCardProps = {
  repo: Repository;
};

// Helper components for displaying metrics with shared classes
const DetailValue: FC<{ children: ReactNode }> = ({ children }) => (
  <span className="font-semibold text-base md:text-lg ml-1 md:ml-2">
    {children}
  </span>
);

const DetailLabel: FC<{ children: ReactNode }> = ({ children }) => (
  <span className="ml-1 text-sm md:text-base text-muted-foreground">
    {children}
  </span>
);

const RepoCard: FC<RepoCardProps> = ({ repo }) => {
  return (
    <article className="flex flex-col max-w-3xl mx-auto w-full border rounded-lg">
      {repo.language ? (
        <div className="pt-6 px-6 flex justify-between items-center">
          <ChipLabel
            variant={repo.language.toLowerCase() as ProgrammingLanguage}
          >
            <span>{repo.language}</span>
          </ChipLabel>
          <Button variant="outline" asChild>
            <a href={repo.html_url}>View on GitHub</a>
          </Button>
        </div>
      ) : null}

      {/* Repo Name */}
      <div className="flex p-6 pt-1.5">
        <h3 className="text-2xl font-semibold">
          {repo.owner.login}/<br />
          {repo.name}
        </h3>
      </div>

      {/* Metrics */}
      <div className="p-6 pt-0 flex flex-col items-start gap-4 w-fit">
        <div className="flex justify-start gap-4 flex-wrap items-baseline">
          {/* Stars */}
          <RepoMetric icon="star">
            <DetailValue>{repo.stargazers_count}</DetailValue>
            <DetailLabel>stars</DetailLabel>
          </RepoMetric>
          {/* Forks */}
          <RepoMetric icon="fork">
            <DetailValue>{repo.forks_count}</DetailValue>
            <DetailLabel>forks</DetailLabel>
          </RepoMetric>

          {/* Issues */}
          <RepoMetric icon="issue">
            <DetailValue>{repo.open_issues_count}</DetailValue>
            <DetailLabel>open issues</DetailLabel>
          </RepoMetric>

          {/* License */}
          <RepoMetric icon="license">
            <DetailValue>{repo.license?.spdx_id}</DetailValue>
            <DetailLabel>
              {!repo.license?.spdx_id ? "N/A" : "license"}
            </DetailLabel>
          </RepoMetric>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm md:text-base">
          {convertEmojiShortcode(repo.description ?? "")}
        </p>
      </div>
    </article>
  );
};

export default RepoCard;
