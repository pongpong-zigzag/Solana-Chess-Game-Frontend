"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { FC, ReactNode, useMemo } from "react";

export const GraphQLProvider: FC<{ children: ReactNode[] | ReactNode }> = ({
    children,
}) => {
    const uri = process.env.NEXT_PUBLIC_CARTESI_URL;
    if (!uri) {
        throw new Error("Missing NEXT_PUBLIC_CARTESI_URL");
    }
    const cache = new InMemoryCache();
    const client = useMemo(() => new ApolloClient({ uri, cache }), [uri]);
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
