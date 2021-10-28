import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
  dehydrate,
} from "react-query";
import { render } from "@testing-library/react";
import { ComponentType, useState } from "react";
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

export function renderWithClient(queryClient: QueryClient, ui: ComponentType) {
  return render(
    <Wrapper dehydratedState={dehydrate(queryClient)} Component={ui} />
  );
}
