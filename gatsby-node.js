const path = require("path");
const kebabCase = require("lodash.kebabcase");

const mdxResolverPassthrough =
  (fieldName) => async (source, args, context, info) => {
    const type = info.schema.getType(`Mdx`);
    const mdxNode = context.nodeModel.getNodeById({
      id: source.parent,
    });
    const resolver = type.getFields()[fieldName].resolve;
    const result = await resolver(mdxNode, args, context, { fieldName });
    return result;
  };

/**
 * @type {import("gatsby").GatsbyNode["createSchemaCustomization"]}
 */
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes, createFieldExtension } = actions;

  createFieldExtension({
    name: `mdxpassthrough`,
    args: {
      fieldName: `String!`,
    },
    extend({ fieldName }) {
      return {
        resolve: mdxResolverPassthrough(fieldName),
      };
    },
  });

  createTypes([
    `
  interface Post implements Node {
    id: ID!
    slug: String!
    title: String!
    date: Date! @dateformat
    draft: Boolean
    excerpt(pruneLength: Int = 160): String!
    body: String!
    html: String
    timeToRead: Int
    tags: [PostTag]
    banner: File @fileByRelativePath
    description: String
  }

  type PostTag {
    name: String
    slug: String
  }

  interface Page implements Node {
    id: ID!
    slug: String!
    title: String!
    excerpt(pruneLength: Int = 160): String!
    body: String!
  }
`,
    schema.buildObjectType({
      name: "MdxPost",
      interfaces: ["Node", "Post"],
      fields: {
        slug: {
          type: "String!",
          extensions: {
            mdxpassthrough: {
              fieldName: "slug",
            },
          },
        },
        title: "String!",
        date: {
          type: "Date!",
          extensions: {
            dateformat: {},
          },
        },
        draft: {
          type: "Boolean",
          resolve: (source) => {
            return source.draft ?? false;
          },
        },
        excerpt: {
          type: "String!",
          args: {
            pruneLength: {
              type: "Int",
              defaultValue: 140,
            },
          },
          extensions: {
            mdxpassthrough: {
              fieldName: "excerpt",
            },
          },
        },
        body: {
          type: "String!",
          extensions: {
            mdxpassthrough: {
              fieldName: "body",
            },
          },
        },
        html: {
          type: "String!",
          extensions: {
            mdxpassthrough: {
              fieldName: "html",
            },
          },
        },
        timeToRead: {
          type: "Int",
          extensions: {
            mdxpassthrough: {
              fieldName: "timeToRead",
            },
          },
        },
        tags: "[PostTag]",
        banner: {
          type: "File",
          extensions: {
            fileByRelativePath: {},
          },
        },
        description: "String",
      },
    }),
    schema.buildObjectType({
      name: "MdxPage",
      interfaces: ["Node", "Page"],
      fields: {
        slug: {
          type: "String!",
          extensions: {
            mdxpassthrough: {
              fieldName: "slug",
            },
          },
        },
        title: "String!",
        excerpt: {
          type: "String!",
          args: {
            pruneLength: {
              type: "Int",
              defaultValue: 140,
            },
          },
          extensions: {
            mdxpassthrough: {
              fieldName: "excerpt",
            },
          },
        },
        body: {
          type: "String!",
          extensions: {
            mdxpassthrough: {
              fieldName: "body",
            },
          },
        },
      },
    }),
  ]);
};

/**
 * @type {import("gatsby").GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = async ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode, createParentChildLink } = actions;

  if (node.internal.type !== "Mdx") {
    return;
  }

  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  if (node.internal.type === "Mdx" && source === "posts") {
    let modifiedTags;

    if (node.frontmatter.tags) {
      modifiedTags = node.frontmatter.tags.map((tag) => ({
        name: tag,
        slug: kebabCase(tag),
      }));
    } else {
      modifiedTags = null;
    }

    const fieldData = {
      title: node.frontmatter.title,
      date: node.frontmatter.date,
      draft: node.frontmatter.draft,
      tags: modifiedTags,
      banner: node.frontmatter.banner,
      description: node.frontmatter.description,
    };

    const mdxPostId = createNodeId(`${node.id} >>> MdxPost`);

    createNode({
      ...fieldData,
      id: mdxPostId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxPost`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Post Interface`,
      },
    });

    createParentChildLink({
      parent: node,
      child: getNode(mdxPostId),
    });
  }

  if (node.internal.type === `Mdx` && source === "pages") {
    const fieldData = {
      title: node.frontmatter.title,
    };

    const mdxPageId = createNodeId(`${node.id} >>> MdxPage`);

    createNode({
      ...fieldData,
      // Required fields
      id: mdxPageId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxPage`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Page interface`,
      },
    });

    createParentChildLink({ parent: node, child: getNode(mdxPageId) });
  }
};

/**
 * @type {import("gatsby").GatsbyNode["createResolvers"]}
 */
exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    SiteSiteMetadata: {
      authorAvatar: {
        type: "File",
        async resolve(source, args, context, info) {
          if (!source.authorAvatarPath) {
            return null;
          }
          const fileNodes = await context.nodeModel.runQuery({
            query: {
              filter: {
                absolutePath: {
                  eq: source.authorAvatarPath,
                },
              },
            },
            type: "File",
            firstOnly: false,
          });

          if (!fileNodes) {
            return null;
          }

          return fileNodes[0];
        },
      },
    },
  });
};

/**
 * @type {import("gatsby").GatsbyNode["onCreateWebpackConfig"]}
 */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
};
