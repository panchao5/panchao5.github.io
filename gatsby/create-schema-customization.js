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
const createSchemaCustomization = ({ actions, schema }) => {
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
            return source.type ?? false;
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

module.exports = createSchemaCustomization;
