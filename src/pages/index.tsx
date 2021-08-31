import * as React from "react";
import { PageProps } from "gatsby";
import Layout from "../components/layout";

// markup
const IndexPage = (props: PageProps) => {
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        起风了，
        <br />
        平庸的人也想努力的生存。
      </div>
    </Layout>
  );
};

export default IndexPage;
