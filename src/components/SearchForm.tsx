import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ProgrammingLanguage } from "@/types/types";

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "c#", label: "C#" },
];

type SearchFormProps = {
  setQuery: Dispatch<SetStateAction<string>>;
  language: string;
  setLanguage: Dispatch<SetStateAction<ProgrammingLanguage>>;
};

const SearchForm: FC<SearchFormProps> = ({
  setQuery,
  language,
  setLanguage,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(searchTerm);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Clear query when input is empty
    if (!e.target.value) {
      setQuery("");
    }
  };

  return (
    <form className="flex flex-col md:flex-row gap-4" onSubmit={handleSubmit}>
      <Input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search repositories..."
        className="flex-1"
      />
      <Select
        value={language}
        onValueChange={(value: ProgrammingLanguage) => setLanguage(value)}
      >
        <SelectTrigger className="md:w-[180px] w-full">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
            fill="#fff"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>{" "}
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
