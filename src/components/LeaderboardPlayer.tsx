import {
    Center,
    Divider,
    Flex,
    Group,
    Paper,
    Stack,
    Text,
} from "@mantine/core";
import { Player } from "@onchess/core";
import { FC } from "react";
import { Address } from "viem";
import { AddressText } from "./AddressText";

export type LeaderboardPlayerProps = {
    account?: Address;
    address: string;
    player: Player;
    position: number;
};

export const LeaderboardPlayer: FC<LeaderboardPlayerProps> = ({
    account,
    address,
    player,
    position,
}) => {
    const me = address === account;

    return (
        <Paper
            withBorder
            bg={me ? "var(--mantine-primary-color-light)" : undefined}
        >
            <Flex gap={5}>
                <Center w={40}>
                    <Text ff="monospace">{position}</Text>
                </Center>
                <Divider orientation="vertical" />
                <Stack gap={5} p={10}>
                    <Group gap={2}>
                        <AddressText
                            address={address as Address}
                            ff="monospace"
                            fw={800}
                        />
                        <Text>({player.rating})</Text>
                    </Group>
                    <Text>
                        {player.played} games ({player.wins} W / {player.losses}{" "}
                        L / {player.draws} D)
                    </Text>
                </Stack>
            </Flex>
        </Paper>
    );
};
