import { createPlayer } from "@onchess/core";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Chess } from "chess.js";
import { Gameboard } from "../components/Gameboard";

const meta = {
    title: "Gameboard",
    component: Gameboard,
    tags: ["autodocs"],
} satisfies Meta<typeof Gameboard>;

export default meta;
type Story = StoryObj<typeof meta>;

const alice = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const bob = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

const now = Math.floor(Date.now() / 1000);

export const Opening: Story = {
    args: {
        game: {
            address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
            black: bob,
            blackTime: 25 * 60,
            pgn: new Chess().pgn(),
            pot: (10n * 10n ** 18n).toString(),
            timeControl: "1500",
            updatedAt: now,
            white: alice,
            whiteTime: 25 * 60,
            result: undefined,
        },
        now,
        onClaimVictory: fn(),
        onMove: fn(),
        onResign: fn(),
        player: createPlayer(alice),
        submitting: false,
    },
};

export const SessionSupport: Story = {
    args: {
        game: {
            address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
            black: bob,
            blackTime: 25 * 60,
            pgn: new Chess().pgn(),
            pot: (10n * 10n ** 18n).toString(),
            timeControl: "1500",
            updatedAt: now,
            white: alice,
            whiteTime: 25 * 60,
            result: undefined,
        },
        now,
        onClaimVictory: fn(),
        onCreateSession: fn(),
        onMove: fn(),
        onResign: fn(),
        player: createPlayer(alice),
        submitting: false,
    },
};

export const Submitting: Story = {
    args: {
        game: {
            address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
            black: bob,
            blackTime: 25 * 60,
            pgn: new Chess().pgn(),
            pot: (10n * 10n ** 18n).toString(),
            timeControl: "1500",
            updatedAt: now,
            white: alice,
            whiteTime: 25 * 60,
            result: undefined,
        },
        now,
        onClaimVictory: fn(),
        onMove: fn(),
        onResign: fn(),
        player: createPlayer(alice),
        submitting: true,
    },
};

const openedGame = new Chess();
openedGame.move("e4");

export const BlackMove: Story = {
    args: {
        game: {
            address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
            black: bob,
            blackTime: 25 * 60,
            pgn: openedGame.pgn(),
            pot: (10n * 10n ** 18n).toString(),
            timeControl: "1500",
            updatedAt: now,
            white: alice,
            whiteTime: 25 * 60,
            result: undefined,
        },
        now,
        onClaimVictory: fn(),
        onMove: fn(),
        onResign: fn(),
        player: createPlayer(bob),
        submitting: false,
    },
};

export const TimeOver: Story = {
    args: {
        game: {
            address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
            black: bob,
            blackTime: 0,
            pgn: openedGame.pgn(),
            pot: (10n * 10n ** 18n).toString(),
            timeControl: "900", // 15 minutes
            updatedAt: now,
            white: alice,
            whiteTime: 60, // 1 minute
            result: undefined,
        },
        now,
        onClaimVictory: fn(),
        onMove: fn(),
        onResign: fn(),
        player: createPlayer(alice),
        submitting: false,
    },
};

export const Expectator: Story = {
    args: {
        game: {
            address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
            white: alice,
            black: bob,
            pgn: '[Event "Casual Game"]\n[Site "OnChess"]\n[Date "2023.05.06"]\n[Round "-"]\n[White "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"]\n[Black "0x90F79bf6EB2c4f870365E785982E1f101E93b906"]\n[Result "1/2-1/2"]\n[WhiteTitle "GM"]\n[BlackTitle "GM"]\n[WhiteElo "2788"]\n[BlackElo "2741"]\n[ECO "D27"]\n[Opening "QGA"]\n[Variation "classical, 6...a6"]\n[WhiteFideId "8603677"]\n[BlackFideId "623539"]\n[EventDate "2023.05.06"]\n\n1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. e3 e6 5. Bxc4 c5 6. O-O a6 7. b3 cxd4 8. Nxd4\nBe7 9. Bb2 O-O 10. Be2 b5 11. a4 bxa4 12. Rxa4 Bb7 13. Nd2 Nbd7 14. Qa1 Nc5 15.\nRa5 h6 16. Rc1 Rc8 17. b4 Ncd7 18. Rxc8 Qxc8 19. Bxa6 Bxa6 20. Rxa6 Bxb4 21. Nc6\nQb7 22. Bxf6 Nxf6 23. Nxb4 Qxb4 24. Nf1 Rb8 25. Ra8 Rxa8 26. Qxa8+ Qf8 27. Qxf8+\nKxf8 28. f3 Nd7 29. Kf2 Ke7 30. e4 Nc5 31. Ke3 Nd7 32. Kf2 Nc5 33. Ke3 Nd7 34.\nKf2 1/2-1/2',
            pot: (10n * 10n ** 18n).toString(),
            timeControl: "1500", // 25 minutes
            whiteTime: 5 * 60, // 5 minutes
            blackTime: 4 * 60, // 4 minutes
            updatedAt: now - 10, // 10 seconds ago
            result: undefined,
        },
        now,
        onClaimVictory: fn(),
        onMove: fn(),
        onResign: fn(),
        submitting: false,
    },
};

export const Error: Story = {
    args: {
        error: "You are not using a paymaster, and the 0x8128886ba96Ebbd2906ebE0C6Ad47e2d765b167C address did not have enough native tokens to cover the gas costs associated with the user",
        game: {
            address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
            black: bob,
            blackTime: 25 * 60,
            pgn: new Chess().pgn(),
            pot: (10n * 10n ** 18n).toString(),
            timeControl: "1500",
            updatedAt: now,
            white: alice,
            whiteTime: 25 * 60,
            result: undefined,
        },
        now,
        onClaimVictory: fn(),
        onMove: fn(),
        onResign: fn(),
        player: createPlayer(alice),
        submitting: false,
    },
};
