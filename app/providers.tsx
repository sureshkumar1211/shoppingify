"use client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  Hydrate,
} from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import React from "react";

const ClientSessionProvider = ({ children }) => {
  const [client] = React.useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );
  return (
    <SessionProvider>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </SessionProvider>
  );
};

export default ClientSessionProvider;
