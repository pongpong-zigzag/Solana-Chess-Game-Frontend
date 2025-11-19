import { Token } from "@onchess/core";
import type { Meta, StoryObj } from "@storybook/react";
import { Balance } from "../../components/connect/Balance";

const meta = {
    title: "Connect/Balance",
    component: Balance,
    tags: ["autodocs"],
} satisfies Meta<typeof Balance>;

export default meta;
type Story = StoryObj<typeof meta>;

const token: Token = {
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC
    decimals: 6,
    name: "USD Coin",
    symbol: "USDC",
};

export const Default: Story = {
    args: {
        balance: "1250000",
        token,
    },
};

export const Transparent: Story = {
    args: {
        balance: "1250000",
        token,
        variant: "transparent",
    },
};

export const Zero: Story = {
    args: {
        balance: "0",
        token,
    },
};

export const RightIcon: Story = {
    args: {
        balance: "1250000",
        token,
        iconPosition: "right",
    },
};

export const Loading: Story = {
    args: {
        token,
        loading: true,
    },
};

export const Error: Story = {
    args: {
        error: "Error loading",
        token,
    },
};
