import type { Meta, StoryObj } from "@storybook/react";

import { Token } from "@onchess/core";
import { ExplorePage } from "../components/ExplorePage";
import empty from "./empty";
import full from "./full";

const meta: Meta<typeof ExplorePage> = {
    title: "ExplorePage",
    component: ExplorePage,
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ExplorePage>;

const token: Token = {
    address: "0x92C6bcA388E99d6B304f1Af3c3Cd749Ff0b591e2",
    decimals: 18,
    name: "Test",
    symbol: "TEST",
};

export const Default: Story = {
    args: {
        state: full,
        token,
    },
};

export const DefaultConnected: Story = {
    args: {
        account: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        state: full,
        token,
    },
};

export const Empty: Story = {
    args: {
        state: empty,
        token,
    },
};

export const EmptyConnected: Story = {
    args: {
        account: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        state: empty,
        token,
    },
};
