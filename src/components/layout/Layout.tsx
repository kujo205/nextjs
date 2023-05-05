import React, { Fragment, ReactNode } from "react";
import Navigation from "./Navigation";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <Navigation />

      <main>{children}</main>
    </Fragment>
  );
};
