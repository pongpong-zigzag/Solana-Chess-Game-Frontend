import { ColorSchemeScript } from "@mantine/core";
import "@mantine/core/styles.css";

import { GraphQLProvider } from "../providers/graphql";
import { StateProvider } from "../providers/state";
import { StyleProvider } from "../providers/style";
import { WalletProvider } from "../providers/wallet";

export const metadata = {
    title: "OnChess",
    description: "OnChain Chess Game",
};

const RootLayout = ({ children }: { children: React.ReactNode[] }) => {
    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
                <link rel="shortcut icon" href="/favicon.svg" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
            </head>
            <body>
                <StyleProvider>
                    <WalletProvider>
                        <GraphQLProvider>
                            <StateProvider>{children}</StateProvider>
                        </GraphQLProvider>
                    </WalletProvider>
                </StyleProvider>
            </body>
        </html>
    );
};

export default RootLayout;
