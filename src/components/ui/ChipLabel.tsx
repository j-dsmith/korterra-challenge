import { ProgrammingLanguage } from "@/types/types";
import { cva } from "class-variance-authority";
import { FC, ReactNode } from "react";

type ChipLabelProps = {
  variant: ProgrammingLanguage;
  children: ReactNode;
};

const chipLabelVariants = cva(
  "rounded-md px-2 py-1 text-xs max-w-fit font-medium",
  {
    variants: {
      variant: {
        javascript: "bg-yellow-100 text-yellow-800",
        typescript: "bg-blue-100 text-blue-800",
        "c#": "bg-purple-100 text-purple-800",
      },
    },
  }
);

const ChipLabel: FC<ChipLabelProps> = ({ children, variant }) => {
  return <div className={chipLabelVariants({ variant })}>{children}</div>;
};

export default ChipLabel;
