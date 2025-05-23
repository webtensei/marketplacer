import { createElement } from "react";
import { createBrowserRouter, RouterProvider, useRouteError } from "react-router-dom";
import { createGuestLayout } from "@app/composition/layout/guest";
import { createAuthView } from "@app/composition/view";
import { LoginRoute } from "@pages/auth/login";
import { RegisterRoute } from "@pages/auth/register";
import { VerifyEmailRoute } from "@pages/auth/verify-email";

// https://github.com/remix-run/react-router/discussions/10166
function BubbleError() {
  const error = useRouteError();
  if (error) throw error;
  return null;
}

const router = createBrowserRouter([
  {
    errorElement: createElement(BubbleError),
    children: [
      createGuestLayout(
        createAuthView(
          LoginRoute(),
          RegisterRoute(),
          VerifyEmailRoute()
        ),



      ),
      // createGuestLayout(NotFoundPageRoute()),
      // { path: "*", element: <Navigate to={routes.page_not_found()} /> },
    ],
  },
]);

export function BrowserRouter() {
  return (
    <RouterProvider router={router} />
  );
}
