import { ProgrammingLanguage } from "@/types/types";
import { cva } from "class-variance-authority";
import { FC, ReactNode } from "react";

type ChipLabelProps = {
  variant: ProgrammingLanguage;
  size?: "sm" | "md";
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
        python: "bg-green-100 text-green-800",
        java: "bg-red-100 text-red-800",
        css: "bg-blue-100 text-blue-800",
        html: "bg-yellow-100 text-yellow-800",
        php: "bg-purple-100 text-purple-800",
        ruby: "bg-red-100 text-red-800",
        "c++": "bg-blue-100 text-blue-800",
        c: "bg-blue-100 text-blue-800",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const ChipLabel: FC<ChipLabelProps> = ({ children, variant, size }) => {
  return <div className={chipLabelVariants({ variant, size })}>{children}</div>;
};

export default ChipLabel;
