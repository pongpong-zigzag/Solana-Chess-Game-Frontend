"use client";
import { Button, Group } from "@mantine/core";
import { Token } from "@onchess/core";
import { FC } from "react";
import {
    useAccount,
    useConnect,
    useConnectors,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
} from "wagmi";
import { ConnectedButton } from "./connect/ConnectedButton";

export type ConnectButtonProps = {
    balance?: string;
    onClick?: () => void;
    token?: Token;
};

export const ConnectButton: FC<ConnectButtonProps> = (props) => {
    const { balance, onClick, token } = props;
    const connectors = useConnectors();
    const { connect, isPending } = useConnect();
    const { address, isConnected } = useAccount();
    const { data: ensName } = useEnsName({ address });
    const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
    const { disconnect } = useDisconnect();

    return (
        <Group>
            {!isConnected ? (
                connectors
                    .filter((c) => c.id === "zerodevPasskeySDK")
                    .map((connector, index) => (
                        <Button
                            key={index}
                            disabled={isPending}
                            onClick={() => connect({ connector })}
                        >
                            {isPending ? "Connecting..." : "Connect"}
                        </Button>
                    ))
            ) : (
                <Group>
                    {address && token && (
                        <ConnectedButton
                            address={address}
                            balance={balance}
                            ensAvatar={ensAvatar}
                            ensName={ensName}
                            loading={false}
                            onClick={onClick}
                            token={token}
                        />
                    )}
                    <Button onClick={() => disconnect()}>Disconnect</Button>
                </Group>
            )}
        </Group>
    );
};
