import { graphql, useStaticQuery } from "gatsby";

type QueryResult = {
  site: {
    siteMetadata: {
      siteUrl: string;
      title: string;
    };
  };
};

const useSiteMetadata = () => {
  const {
    site: { siteMetadata },
  } = useStaticQuery<QueryResult>(graphql`
    query SiteMetadtaQuery {
      site {
        siteMetadata {
          siteUrl
          title
        }
      }
    }
  `);

  return siteMetadata;
};

export default useSiteMetadata;
