import React from "react";
import "../../App.css";

const PageContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="pt-8 pb-4 container h-screen mx-auto text-3xl mb-6">
      {children}
    </div>
  );
};

export default PageContainer;
