import { createElement } from "react";
import { RouteObject } from "react-router-dom";
import { routes } from "@shared/lib/react-router";
import { LoginPage } from "./ui/login.page";

export const LoginRoute = (...rest: RouteObject[]): RouteObject => {
  return {
    path: `${routes.auth.login()}`,
    element: createElement(LoginPage),
    children: [...rest],
  };
};
