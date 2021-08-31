const path = require("path");

/**
 * @type {import("gatsby").GatsbyNode["onCreateWebpackConfig"]}
 */
const onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "../src"),
      },
    },
  });
};

module.exports = onCreateWebpackConfig;
