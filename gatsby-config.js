module.exports = {
  siteMetadata: {
    siteUrl: "https://panchao5.github.io",
    title: "panchao5.github.io",
  },
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blogs",
        path: "./blogs",
      },
      __key: "blogs",
    },
  ],
};
