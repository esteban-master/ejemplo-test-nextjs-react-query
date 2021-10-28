import "../styles/globals.css";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  if (typeof window !== "undefined") {
    const { worker } = require("../mocks/browser");
    worker.start();
  } else {
    const { mockServer } = require("../mocks/server");
    mockServer.listen();
  }
}

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
