import type { Meta, StoryObj } from "@storybook/react";

import { Games } from "../components/Games";
import full from "./full";

const meta: Meta<typeof Games> = {
    title: "Games",
    component: Games,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Games>;

export const Disconnected: Story = {
    args: {
        games: full.games,
        token: {
            address: "0x92C6bcA388E99d6B304f1Af3c3Cd749Ff0b591e2",
            decimals: 18,
            name: "Test",
            symbol: "TEST",
        },
    },
};

export const Connected: Story = {
    args: {
        account: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        games: full.games,
        token: {
            address: "0x92C6bcA388E99d6B304f1Af3c3Cd749Ff0b591e2",
            decimals: 18,
            name: "Test",
            symbol: "TEST",
        },
    },
};
