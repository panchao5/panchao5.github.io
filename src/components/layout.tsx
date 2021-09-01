import React, { ReactNode } from "react";
import GlobalStyles from "@/styles/GlobalStyles";
import Navbar from "@/components/navbar";
import useSiteMetadata from "@/hooks/use-site-metadata";

interface LayoutProps {
  children: ReactNode;
}

export default (props: LayoutProps) => {
  const siteMetadata = useSiteMetadata();
  return (
    <>
      <GlobalStyles />
      <header>
        <Navbar siteTitle={siteMetadata.title} />
      </header>
      {props.children}
    </>
  );
};
