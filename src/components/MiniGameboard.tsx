"use client";

import {
    Center,
    Divider,
    Group,
    Paper,
    Stack,
    Text,
    Tooltip,
} from "@mantine/core";
import { Game, Token } from "@onchess/core";
import { IconChessKnight } from "@tabler/icons-react";
import { Chess } from "chess.js";
import { FC } from "react";
import { ChessBoard } from "react-fen-chess-board";
import { Address, getAddress } from "viem";
import { formatAmount, formatTimeControl } from "../util/format";
import { Clock } from "./Clock";
import { PlayerText } from "./PlayerText";

export type MiniGameboardProps = {
    account?: Address;
    address: Address;
    game: Game;
    now: number;
    token: Token;
};

export const MiniGameboard: FC<MiniGameboardProps> = ({
    account,
    address,
    game,
    now,
    token,
}) => {
    const chess = new Chess();
    chess.loadPgn(game.pgn);
    const turn = chess.turn();

    const header = chess.header();
    const white = header["White"];
    const black = header["Black"];
    const mine = white === account || black === account;

    return (
        <Paper
            p={20}
            withBorder
            shadow="md"
            bg={mine ? "var(--mantine-primary-color-light)" : undefined}
        >
            <Center>
                <Stack gap={3}>
                    <Group justify="space-between">
                        <PlayerText
                            address={getAddress(black!)}
                            color="b"
                            isTurn={turn === "b"}
                        />
                        <Clock
                            active={turn === "b"}
                            now={now}
                            secondsRemaining={game.blackTime}
                            startTime={game.updatedAt}
                        />
                    </Group>
                    <ChessBoard
                        fen={chess.fen()}
                        boardTheme={{
                            darkSquare: "#b58863",
                            lightSquare: "#f0d9b5",
                        }}
                        renderCoordinate={() => <></>}
                    />
                    <Group justify="space-between">
                        <PlayerText
                            address={getAddress(white!)}
                            color="w"
                            isTurn={turn === "w"}
                        />
                        <Clock
                            active={turn === "w"}
                            now={now}
                            secondsRemaining={game.whiteTime}
                            startTime={game.updatedAt}
                        />
                    </Group>
                    <Divider />
                    <Group justify="space-between" mt={5}>
                        <Group gap={5}>
                            <Text>Pot</Text>
                            <Text fw={800}>
                                {formatAmount(BigInt(game.pot), token)}
                            </Text>
                        </Group>
                        <Group gap={5}>
                            <Text>Time Control</Text>
                            <Tooltip
                                label={formatTimeControl(game.timeControl)}
                            >
                                <Text fw={800}>{game.timeControl}</Text>
                            </Tooltip>
                        </Group>
                    </Group>
                </Stack>
            </Center>
        </Paper>
    );
};

export const MiniGameboardPlaceholder: FC = () => {
    return (
        <Paper p={20} withBorder shadow="md" mih={200}>
            <Center h="100%">
                <Stack gap={3} align="center">
                    <IconChessKnight />
                    <Text fw={800}>No games</Text>
                </Stack>
            </Center>
        </Paper>
    );
};
