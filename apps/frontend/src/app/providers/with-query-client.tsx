import { lazy, ReactNode, Suspense, useEffect, useState } from "react";
import { QueryClientProvider as TanStackQueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@shared/lib/react-query";

type QueryClientProviderProps = {
  children: ReactNode;
};

const ReactQueryDevtoolsProduction = lazy(() =>
  // eslint-disable-next-line import/no-extraneous-dependencies
  import("@tanstack/react-query-devtools/build/modern/production.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
);

export function QueryClientProvider(props: QueryClientProviderProps) {
  const { children } = props;
  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    // @ts-ignore
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);
  return (
    <TanStackQueryClientProvider client={queryClient}>
      {children}
      {import.meta.env.MODE === "development" &&
        ((<ReactQueryDevtools initialIsOpen={false} />) as ReactNode)}
      {showDevtools &&
        ((
          <Suspense fallback={null}>
            <ReactQueryDevtoolsProduction />
          </Suspense>
        ) as ReactNode)}
    </TanStackQueryClientProvider>
  );
}
