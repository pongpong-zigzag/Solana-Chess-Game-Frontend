import { Token } from "@onchess/core";
import type { Meta, StoryObj } from "@storybook/react";
import { WaitOpponent } from "../components/WaitOpponent";

const meta = {
    title: "WaitOpponent",
    component: WaitOpponent,
    tags: ["autodocs"],
} satisfies Meta<typeof WaitOpponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const alice = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

const now = Math.floor(Date.now() / 1000);
const token: Token = {
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC
    decimals: 6,
    name: "USD Coin",
    symbol: "USDC",
};

export const Default: Story = {
    args: {
        lobby: {
            bet: (1n * 10n ** BigInt(token.decimals)).toString(),
            createdAt: now,
            minRating: 800,
            maxRating: 1200,
            player: alice,
            timeControl: "1500",
        },
        token,
    },
};
