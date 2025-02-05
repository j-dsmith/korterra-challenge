import { CircleAlert } from "lucide-react";
import { FC } from "react";

type ErrorMessageProps = {
  error: string;
};

const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div className="flex flex-col max-w-3xl mx-auto w-full border border-red-300 rounded-lg">
      <div className="p-6 flex items-center gap-4 bg-red-200 text-red-700">
        <CircleAlert className="h-6 w-6" />
        <h3 className="text-2xl font-semibold ">{error}</h3>
      </div>
    </div>
  );
};

export default ErrorMessage;
