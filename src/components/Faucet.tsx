import { Alert } from "@mantine/core";
import { FC } from "react";

export const Faucet: FC = () => {
    return (
        <Alert title="Testnet" color="yellow">
            Testnet USDC can be obtained from the{" "}
            <a href="https://faucet.circle.com" target="_blank">
                Circle Testnet Faucet
            </a>
        </Alert>
    );
};
