import { createElement } from "react";
import { RouteObject } from "react-router-dom";
import { routes } from "@shared/lib/react-router";
import { VerifyEmailPage } from "./ui/verify-email.page";

export const VerifyEmailRoute = (...rest: RouteObject[]): RouteObject => {
  return {
    path: `${routes.auth.verifyEmail()}`,
    element: createElement(VerifyEmailPage),
    children: [...rest],
  };
};
