/**
 * @type {import("gatsby").GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    siteUrl: "https://panchao5.github.io",
    siteTitle: "岁月 · 青柠",
    author: "猫小成",
    authorBio: "起风了，努力的活下去。",
    authorAvatarPath: `${__dirname}/src/images/avatar.jpg`,
    socialLinks: [
      {
        name: "github",
        link: "https://github.com/panchao5",
      },
      {
        name: "weibo",
        link: "https://weibo.com/7606205681/profile",
      },
    ],
  },
  plugins: [
    "gatsby-plugin-emotion",
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
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
  ],
};
