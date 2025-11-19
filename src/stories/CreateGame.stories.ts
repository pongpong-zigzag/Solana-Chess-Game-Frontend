import { createPlayer } from "@onchess/core";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { CreateGame } from "../components/CreateGame";

const meta = {
    title: "CreateGame",
    component: CreateGame,
    tags: ["autodocs"],
} satisfies Meta<typeof CreateGame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Disconnected: Story = {
    args: {
        decimals: 6,
        executing: false,
        symbol: "USDC",
        onCreate: fn(),
        onConnect: fn(),
    },
};

export const Connected: Story = {
    args: {
        decimals: 6,
        executing: false,
        symbol: "USDC",
        onCreate: fn(),
        player: createPlayer("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"),
    },
};

export const Balance3: Story = {
    args: {
        decimals: 6,
        executing: false,
        symbol: "USDC",
        onCreate: fn(),
        player: {
            address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            balance: (3n * 10n ** 6n).toString(),
            draws: 0,
            losses: 0,
            played: 0,
            rating: 1000,
            wins: 0,
        },
    },
};

export const Error: Story = {
    args: {
        decimals: 6,
        executing: false,
        error: `The paymaster simulated the user operation to estimate the gas cost and found that the execution will revert.

To troubleshoot this error, we recommend double-checking the logic that you used to create the user operation's callData. If you are batching calls, test each call separately to identify the culprit. If you are unable to quickly identify the issue, you may need to simulate the user operation.`,
        symbol: "USDC",
        onCreate: fn(),
        player: {
            address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            balance: (3n * 10n ** 6n).toString(),
            draws: 0,
            losses: 0,
            played: 0,
            rating: 1000,
            wins: 0,
        },
    },
};
