import * as React from "react";
import { PageProps } from "gatsby";
import Layout from "../components/layout";

import styled from "@emotion/styled";

const Banner = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  line-height: 2;
`;

// markup
const IndexPage = (props: PageProps) => {
  return (
    <Layout>
      <Banner>
        起风了，
        <br />
        平庸的人也想努力的生存。
      </Banner>
    </Layout>
  );
};

export default IndexPage;
