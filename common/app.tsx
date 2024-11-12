import React from "react";
import { Route } from "react-router-dom";
import { App, SnackbarProvider } from "zmp-ui";
import { AnimationRoutes } from "./router";
import HomePage from "./pages/index";
import About from "./pages/about";
import Form from "./pages/form";
import User from "./pages/user";

const CommonApp = (props) => {
  const { AppRouter, children } = props;

  return (
    <App>
      <SnackbarProvider>
        <AppRouter>
          <AnimationRoutes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/about" element={<About></About>}></Route>
            <Route path="/form" element={<Form></Form>}></Route>
            <Route path="/user" element={<User></User>}></Route>
          </AnimationRoutes>
          { children }
        </AppRouter>
      </SnackbarProvider>
    </App>
  );
};
export default CommonApp;
