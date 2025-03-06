import { createElement } from "react";
import AuthView from "./auth-view.ui";
import { RouteObject } from "react-router-dom";

export const createAuthView = (...rest: RouteObject[]): RouteObject => {
    return {
      element: createElement(AuthView),
      children: [...rest],
    };
  };
  