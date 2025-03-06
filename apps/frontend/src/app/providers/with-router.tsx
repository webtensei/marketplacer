import { createElement } from "react";
import { createBrowserRouter, RouterProvider, useRouteError } from "react-router-dom";
import { createGuestLayout } from "@app/composition/layout/guest";
import { routes } from "@shared/lib/react-router";
import { createAuthView } from "@app/composition/view";
import { Button } from "@nextui-org/react";
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
          {
            path: "/",
            element: <div><Button color="warning">Home</Button></div>,
          },
        ),



      ),
      // createGuestLayout(NotFoundPageRoute()),
      // { path: "*", element: <Navigate to={routes.page_not_found()} /> },
    ],
  },
]);

export function BrowserRouter() {
  return <RouterProvider router={router} />;
}
