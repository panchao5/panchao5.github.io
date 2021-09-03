import React, { ReactNode } from "react";
import "twin.macro";
import { useLocation } from "@reach/router";
import GlobalStyles from "@/styles/GlobalStyles";
import ProfileCard from "@/components/profile-card";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import useSiteMetadata from "@/hooks/use-site-metadata";

interface LayoutProps {
  children: ReactNode;
}

export default (props: LayoutProps) => {
  const location = useLocation();
  const siteMetadata = useSiteMetadata();

  const showSideMenu = !location.pathname.startsWith("/post/");

  return (
    <>
      <GlobalStyles />
      <header>
        <Navbar siteTitle={siteMetadata.siteTitle} />
      </header>
      <main tw="md:flex flex-row my-6 justify-center">
        {showSideMenu && <ProfileCard />}
        <div tw="flex-1 max-w-[70ch]">{props.children}</div>
      </main>
      <Footer siteMetadata={siteMetadata} />
    </>
  );
};
