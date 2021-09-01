import React from "react";
import { Global, css } from "@emotion/react";
import tw, { theme, GlobalStyles as BaseStyles } from "twin.macro";

const customStyles = css`
  body {
    color: ${theme`colors.gray.700`};
    background-color: ${theme`colors.gray.100`};
    ${tw`antialiased`}
  }
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);

export default GlobalStyles;
