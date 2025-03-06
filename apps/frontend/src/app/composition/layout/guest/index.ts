import { createElement } from "react";
import GuestLayout from "./guest-layout.ui";
import { RouteObject } from "react-router-dom";

export const createGuestLayout = (...rest: RouteObject[]): RouteObject => {
    return {
      element: createElement(GuestLayout),
      children: [...rest],
    };
  };
  