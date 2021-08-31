import React, { ReactNode } from "react";
import useSiteMetadata from "@/hooks/use-site-metadata";

interface LayoutProps {
  children: ReactNode;
}

export default (props: LayoutProps) => {
  const siteMetadata = useSiteMetadata();
  return (
    <>
      <header>{siteMetadata.title}</header>
      {props.children}
    </>
  );
};
