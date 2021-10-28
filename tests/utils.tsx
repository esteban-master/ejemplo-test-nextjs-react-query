import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
  dehydrate,
} from "react-query";
import { render } from "@testing-library/react";
import { ComponentType, useState } from "react";
import { NextRouter } from "next/dist/client/router";

const Wrapper = ({ Component, ...pageProps }: any) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // desactiva los reintentos en testing
            retry: false,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
};

// React Query
export function renderWithClient(queryClient: QueryClient, ui: ComponentType) {
  return render(
    <Wrapper dehydratedState={dehydrate(queryClient)} Component={ui} />
  );
}

const useRouter = jest.spyOn(require("next/router"), "useRouter");
export function mockNextUserRouter(
  props: Pick<NextRouter, "route" | "pathname" | "query" | "asPath">
) {
  useRouter.mockImplementation(() => ({
    route: props.route,
    pathname: props.pathname,
    query: props.query,
    asPath: props.asPath,
  }));
}
