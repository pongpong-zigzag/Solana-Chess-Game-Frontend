"use client";

import { FC, PropsWithChildren } from "react";
import { WalletConnectWalletProvider } from "./wallet/walletconnect";

export type WalletProviderType = "ZeroDev" | "WalletConnect";

const extractChain = () => {
    const chainId = process.env.NEXT_PUBLIC_CHAIN_ID;
    if (!chainId) {
        throw new Error("Missing NEXT_PUBLIC_CHAIN_ID");
    }
    if (isNaN(parseInt(chainId))) {
        throw new Error("Invalid NEXT_PUBLIC_CHAIN_ID");
    }
    switch (parseInt(chainId)) {
        case base.id:
            return base;
        case baseSepolia.id:
            return baseSepolia;
        case foundry.id:
            return foundry;
        default:
            return foundry;
    }
};

export const getProviderType = (): WalletProviderType => {
    const type = process.env.NEXT_PUBLIC_WALLET_PROVIDER;
    if (!type) {
        throw new Error("Missing NEXT_PUBLIC_WALLET_PROVIDER");
    }
    switch (type) {
        case "WalletConnect":
            return "WalletConnect";
        case "ZeroDev":
            return "ZeroDev";
    }
    throw new Error("Invalid NEXT_PUBLIC_WALLET_PROVIDER");
};

export const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
    // read chain configuration from env
    const chain = extractChain();

    // read provider configuration from env
    const provider = getProviderType();

    switch (provider) {
        case "WalletConnect": {
            const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
            if (!projectId) {
                throw new Error("Missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID");
            }
            return (
                <WalletConnectWalletProvider
                    chain={chain}
                    projectId={projectId}
                >
                    {children}
                </WalletConnectWalletProvider>
            );
        }
        case "ZeroDev": {
            const projectId = process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID;
            if (!projectId) {
                throw new Error("Missing NEXT_PUBLIC_ZERODEV_PROJECT_ID");
            }
            return (
                <ZeroDevWalletProvider chain={chain} projectId={projectId}>
                    {children}
                </ZeroDevWalletProvider>
            );
        }
    }
};
