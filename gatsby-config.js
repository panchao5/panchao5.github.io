module.exports = {
  siteMetadata: {
    siteUrl: "https://panchao5.github.io",
    title: "panchao5.github.io",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.svg",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/src/content/posts`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/content/pages`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      // options: {
      //   gatsbyRemark
      // }
    },
    // 'gatsby-remark-images',
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
  ],
};
