import React from "react";
import "../../App.css";
import styles from "./PageContainer.module.css";

const PageContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className={styles.pageContainer}>{children}</div>;
};

export default PageContainer;
