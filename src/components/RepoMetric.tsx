import { cn } from "@/lib/utils";
import { RepoDetailIconType } from "@/types/types";
import { CircleAlert, GitFork, Scale, Star } from "lucide-react";
import { FC, ReactNode } from "react";

/**
 * Utility function to get the icon and color class based on the icon type
 * @param icon - Icon type
 * @param isActive - Flag to determine if the icon is active
 * @returns Object containing the icon component and color class
 */
const getIcon = (icon: RepoDetailIconType, isActive: boolean) => {
  const ICONS = {
    star: { Component: Star, colorClass: "text-amber-400" },
    fork: { Component: GitFork, colorClass: "text-blue-400" },
    issue: { Component: CircleAlert, colorClass: "text-red-400" },
    license: {
      Component: Scale,
      colorClass: cn(isActive ? "text-green-400" : "text-muted-foregrou d"),
    },
  };
  return ICONS[icon];
};

type RepoDetailItemProps = {
  icon: RepoDetailIconType;
  children: ReactNode;
  isActive?: boolean;
};

const RepoMetric: FC<RepoDetailItemProps> = ({
  icon,
  isActive = true,
  children,
}: RepoDetailItemProps) => {
  const Icon = getIcon(icon, isActive);

  const baseClasses = "w-5 h-5";

  return (
    <div className="flex text-base items-center">
      <Icon.Component className={cn(baseClasses, Icon.colorClass)} />
      {children}
    </div>
  );
};

export default RepoMetric;
