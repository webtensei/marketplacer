import { env } from "@/shared/config";

export const routes = {
  root: "/",
  home() {
    return routes.root;
  },
  auth: {
    login() {
      return routes.root.concat("login/");
    },
    register() {
      return routes.root.concat("register/");
    },
  },
};
