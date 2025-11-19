"use client";

import { ActionIcon, Anchor, Flex, Group, Text } from "@mantine/core";
import { Player, Token } from "@onchess/core";
import { IconBrandGithub, IconBrandX } from "@tabler/icons-react";
import { FC } from "react";
import { getProviderType } from "../providers/wallet";
import { ConnectButton } from "./ConnectButton";

export type HeaderProps = {
    address?: string;
    player?: Player;
    token?: Token;
};

export const Header: FC<HeaderProps> = ({ player, token }) => {
    const provider = getProviderType();

    return (
        <Group justify="space-between" py={10} px={20}>
            <Group align="baseline">
                <Text ff="Cardo" fz={26}>
                    OnChess
                </Text>
            </Group>
            <Flex justify="flex-end" align="center" gap={5}>
                {provider === "WalletConnect" && <w3m-button />}
                {token && provider === "ZeroDev" && (
                    <ConnectButton token={token} balance={player?.balance} />
                )}
                <Anchor href="https://github.com/onchess" target="_blank">
                    <ActionIcon
                        size="lg"
                        color="gray"
                        variant="subtle"
                        radius="lg"
                    >
                        <IconBrandGithub
                            style={{ width: "70%", height: "70%" }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                </Anchor>
                <Anchor href="https://x.com/OnChessProject" target="_blank">
                    <ActionIcon
                        size="lg"
                        color="gray"
                        variant="subtle"
                        radius="lg"
                    >
                        <IconBrandX
                            style={{ width: "70%", height: "70%" }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                </Anchor>
            </Flex>
        </Group>
    );
};
