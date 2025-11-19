import { Center, Group, Paper, Stack, Text, Tooltip } from "@mantine/core";
import { LobbyItem as LobbyItemModel, Token } from "@onchess/core";
import { IconChessRook } from "@tabler/icons-react";
import { FC } from "react";
import { Address } from "viem";
import { formatAmount, formatTimeControl } from "../util/format";
import { AddressText } from "./AddressText";

export type LobbyItemProps = {
    account?: Address;
    item: LobbyItemModel;
    token: Token;
};

export const LobbyItem: FC<LobbyItemProps> = (props) => {
    const { account, item, token } = props;
    const mine = item.player === account;

    return (
        <Paper
            h="100%"
            p={20}
            withBorder
            shadow="md"
            bg={mine ? "var(--mantine-primary-color-light)" : undefined}
        >
            <Stack justify="space-around" gap={5}>
                <Group>
                    <Text>Player</Text>
                    <AddressText
                        fw={800}
                        ff="monospace"
                        address={item.player}
                    />
                </Group>
                <Group>
                    <Text>Bet</Text>
                    <Text fw={800}>
                        {formatAmount(BigInt(item.bet), token)}
                    </Text>
                </Group>
                <Group>
                    <Text>Time Control</Text>
                    <Tooltip label={formatTimeControl(item.timeControl)}>
                        <Text fw={800}>{item.timeControl}</Text>
                    </Tooltip>
                </Group>
                <Group>
                    <Text>Opponent</Text>
                    {item.minRating > 0 &&
                        item.maxRating < Number.MAX_SAFE_INTEGER && (
                            <Text fw={800}>
                                From {item.minRating} up to {item.maxRating}
                            </Text>
                        )}
                    {item.minRating > 0 &&
                        item.maxRating === Number.MAX_SAFE_INTEGER && (
                            <Text fw={800}>From {item.minRating}</Text>
                        )}
                    {item.minRating === 0 &&
                        item.maxRating < Number.MAX_SAFE_INTEGER && (
                            <Text fw={800}>Up to {item.maxRating}</Text>
                        )}
                    {item.minRating === 0 &&
                        item.maxRating === Number.MAX_SAFE_INTEGER && (
                            <Text fw={800}>Any</Text>
                        )}
                </Group>
            </Stack>
        </Paper>
    );
};

export type LobbyItemPlaceholderProps = {};

export const LobbyItemPlaceholder: FC<LobbyItemPlaceholderProps> = () => {
    return (
        <Paper h="100%" withBorder shadow="md" mih={200}>
            <Center h="100%">
                <Stack align="center" gap={3}>
                    <IconChessRook />
                    <Text fw={800}>Lobby empty</Text>
                </Stack>
            </Center>
        </Paper>
    );
};
