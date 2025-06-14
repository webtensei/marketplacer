import { createElement } from "react";
import { RouteObject } from "react-router-dom";
import { routes } from "@shared/lib/react-router";
import { RegisterPage } from "./register.page";

export const RegisterRoute = (...rest: RouteObject[]): RouteObject => {
  return {
    path: `${routes.auth.register()}`,
    element: createElement(RegisterPage),
    children: [...rest],
  };
};
