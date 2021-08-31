const createSchemaCustomization = require("./gatsby/create-schema-customization");
const onCreateNode = require("./gatsby/on-create-node");
const onCreateWebpackConfig = require("./gatsby/on-create-webpack-config");

module.exports = {
  createSchemaCustomization,
  onCreateNode,
  onCreateWebpackConfig,
};
