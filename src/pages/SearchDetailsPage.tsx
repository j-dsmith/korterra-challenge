import { Button } from "@/components/ui/button";
import PageContainer from "../layouts/PageContainer";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Repository, repositorySchema } from "@/schemas/repoSchema";
import { useEffect, useMemo, useState } from "react";
import RepoCard from "@/components/RepoCard";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { convertEmojiShortcode } from "@/lib/utils";

const BASE_URL = "https://api.github.com/repositories/";

export default function SearchDetailsPage() {
  const { state } = useLocation();
  const { id: repoId } = useParams();
  const navigate = useNavigate();

  const fullUrl = useMemo(() => `${BASE_URL}${repoId}`, [repoId]);

  const [repo, setRepo] = useState<Repository>(state?.repo || null);
  const [loading, setLoading] = useState(!state?.repo);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // Fetch repo details if not passed via state
    if (!repo) {
      const fetchRepo = async () => {
        setLoading(true);
        try {
          const response = await fetch(fullUrl, {
            signal,
            headers: {},
          });

          if (!response.ok) {
            throw new Error(
              `GitHub API error: ${response.status} - ${response.statusText}`
            );
          }
          // Parse the response
          const data = await response.json();
          const parsedData = repositorySchema.parse(data);

          // Parse the description for emojis
          parsedData.description = convertEmojiShortcode(
            parsedData.description ?? ""
          );

          setRepo(parsedData);
        } catch (error) {
          if (error instanceof Error && error.name !== "AbortError") {
            setError(error.message);
          } else {
            setError("An error occurred");
          }
        } finally {
          setLoading(false);
        }
      };
      fetchRepo();

      // Abort fetch if component unmounts
      return () => {
        controller.abort();
      };
    }
  }, [repo, repoId, fullUrl]);

  return (
    <PageContainer>
      <section className="px-8">
        <h1 className="font-bold">Repository Details</h1>
        <div className="flex flex-col gap-20 py-8">
          <Button
            variant="link"
            className="flex justify-between max-w-fit gap-4 px-0"
            onClick={() => navigate("/")}
          >
            <ArrowLeft /> Back to Search
          </Button>

          {loading && (
            <div className="flex flex-col max-w-3xl mx-auto w-full border rounded-lg">
              <div className="p-6 pt-1.5">
                <h3 className="text-2xl font-semibold">Loading...</h3>
              </div>
            </div>
          )}

          {error && <ErrorMessage error={error} />}

          {!loading && !error && repo && <RepoCard repo={repo} />}
        </div>
      </section>
    </PageContainer>
  );
}
