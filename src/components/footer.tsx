import "twin.macro";
import { SiteMetadata } from "@/types";

interface FooterProps {
  siteMetadata: SiteMetadata;
}

const Footer = ({ siteMetadata }: FooterProps) => {
  return (
    <footer tw="mt-6 text-sm text-center">
      &copy; 2021 {siteMetadata.author} ❤️ Powered by{" "}
      <a tw="underline" href="https://www.gatsbyjs.com/">
        Gatsby
      </a>
    </footer>
  );
};

export default Footer;
