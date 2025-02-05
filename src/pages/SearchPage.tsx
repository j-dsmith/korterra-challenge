import { useFetchRepos } from "@/hooks/useFetchRepos";
import PageContainer from "../layouts/PageContainer/PageContainer";

import SearchForm from "@/components/SearchForm";
import { useState } from "react";
import SearchResults from "@/components/SearchResults";
import { ProgrammingLanguage } from "@/types/types";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState<ProgrammingLanguage>("javascript");

  const searchResult = useFetchRepos(query, language);

  return (
    <PageContainer>
      <section className="flex flex-col gap-6 px-8 max-h-full">
        <h1 className="font-bold">GitHub Repository Search</h1>
        <SearchForm
          setQuery={setQuery}
          language={language}
          setLanguage={setLanguage}
        />
        <SearchResults {...searchResult} />
      </section>
    </PageContainer>
  );
}
