import React, { ReactNode } from "react";
import { Global, css } from "@emotion/react";

interface LayoutProps {
  children: ReactNode;
}

export default (props: LayoutProps) => {
  return (
    <>
      <Global
        styles={css`
          html,
          body {
            padding: 0;
            margin: 0;
          }
        `}
      ></Global>
      {props.children}
    </>
  );
};
