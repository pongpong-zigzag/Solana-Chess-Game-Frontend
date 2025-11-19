import {
    Badge,
    Box,
    Group,
    LoadingOverlay,
    Stack,
    StackProps,
    ThemeIcon,
} from "@mantine/core";
import { LobbyItem, Token } from "@onchess/core";
import { IconClock, IconStar } from "@tabler/icons-react";
import { Chess } from "chess.js";
import { FC } from "react";
import { BoardTheme, ChessBoard } from "react-fen-chess-board";
import { formatTimeControl } from "../util/format";
import { AddressText } from "./AddressText";
import { Balance } from "./connect/Balance";

export interface WaitOpponentProps extends StackProps {
    lobby: LobbyItem;
    token: Token;
}

export const WaitOpponent: FC<WaitOpponentProps> = (props) => {
    const { lobby, token, ...stackProps } = props;
    const chess = new Chess();
    const fen = chess.fen();

    // change default board theme
    const boardTheme: BoardTheme = {
        darkSquare: "#b58863",
        lightSquare: "#f0d9b5",
    };

    return (
        <Stack {...stackProps}>
            <Group justify="space-between">
                <Group gap={3}>
                    <Balance token={token} balance={lobby.bet} />
                </Group>
                <Group gap={3}>
                    <Badge
                        size="lg"
                        variant="outline"
                        leftSection={
                            <ThemeIcon variant="transparent">
                                <IconStar />
                            </ThemeIcon>
                        }
                    >
                        {lobby.minRating} - {lobby.maxRating}
                    </Badge>
                </Group>
                <Group gap={3}>
                    <Badge
                        size="lg"
                        variant="outline"
                        leftSection={
                            <ThemeIcon variant="transparent">
                                <IconClock />
                            </ThemeIcon>
                        }
                    >
                        {formatTimeControl(lobby.timeControl)}
                    </Badge>
                </Group>
            </Group>
            <Box pos="relative">
                <LoadingOverlay
                    visible
                    zIndex={1000}
                    overlayProps={{
                        backgroundOpacity: 0.3,
                    }}
                />
                <ChessBoard fen={fen} boardTheme={boardTheme} />
            </Box>
            <Group justify="space-between">
                <AddressText address={lobby.player} fw={600} ff="monospace" />
                <Badge color="gray" variant="dot" size="lg">
                    Waiting opponent...
                </Badge>
            </Group>
        </Stack>
    );
};
