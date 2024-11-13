// React core
import React from "react";
import { createRoot } from "react-dom/client";

import appConfig from "../app-config.json";
if (!window.APP_CONFIG) {
  // @ts-expect-error skip checking pages attr for app config type because zma will handle this
  window.APP_CONFIG = appConfig;
}

import ZMApp from "components/app";
const root = createRoot(document.getElementById("app")!);
root.render(React.createElement(ZMApp));
