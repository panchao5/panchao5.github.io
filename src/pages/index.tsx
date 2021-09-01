import React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "@/components/layout";
import PostPreview, { PreviewPost } from "@/components/post-preview";

type HomepageData = {
  allPost: {
    nodes: Array<PreviewPost>;
  };
};

const Homepage = (props: PageProps<HomepageData>) => {
  const {
    data: {
      allPost: { nodes: posts },
    },
  } = props;

  return (
    <Layout>
      <div>
        {posts.map((post) => (
          <PostPreview key={post.slug} post={post}></PostPreview>
        ))}
      </div>
    </Layout>
  );
};

// markup
export default Homepage;

export const query = graphql`
  query RecentPostsQuery {
    allPost(sort: { fields: [date], order: DESC }, limit: 5) {
      nodes {
        ...PostPreview
      }
    }
  }
`;
