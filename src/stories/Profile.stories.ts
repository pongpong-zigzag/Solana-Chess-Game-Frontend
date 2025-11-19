import { INITIAL_RATING } from "@onchess/core";
import type { Meta, StoryObj } from "@storybook/react";
import { Profile } from "../components/Profile";

const meta = {
    title: "Profile",
    component: Profile,
    tags: ["autodocs"],
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof meta>;

const alice = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

export const NewPlayer: Story = {
    args: {
        player: {
            address: alice,
            balance: "0",
            draws: 0,
            losses: 0,
            played: 0,
            rating: INITIAL_RATING,
            wins: 0,
        },
    },
};
