import React from "react";
import { App, SnackbarProvider } from "zmp-ui";

import { Layout } from "./components/layout";

import "swiper/css";
import "swiper/css/pagination";
import "zmp-ui/zaui.css";
import "./css/tailwind.css";
import "./css/app.scss";

const CommonApp = (props) => {
  const { AppRouter, children } = props;

  return (
    <App>
      <SnackbarProvider>
        <AppRouter>
          <Layout />
          {children}
        </AppRouter>
      </SnackbarProvider>
    </App>
  );
};
export default CommonApp;
