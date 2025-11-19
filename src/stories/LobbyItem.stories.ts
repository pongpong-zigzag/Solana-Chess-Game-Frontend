import { Token } from "@onchess/core";
import type { Meta, StoryObj } from "@storybook/react";
import { LobbyItem } from "../components/LobbyItem";

const meta = {
    title: "LobbyItem",
    component: LobbyItem,
    tags: ["autodocs"],
} satisfies Meta<typeof LobbyItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const now = Math.floor(Date.now() / 1000);

const token: Token = {
    address: "0x92C6bcA388E99d6B304f1Af3c3Cd749Ff0b591e2",
    decimals: 18,
    name: "Test",
    symbol: "TEST",
};

const alice = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
export const Alice: Story = {
    args: {
        item: {
            bet: (10n * 10n ** BigInt(token.decimals)).toString(),
            createdAt: now,
            minRating: 800,
            maxRating: 1200,
            player: alice,
            timeControl: "1500",
        },
        token,
        account: alice,
    },
};
