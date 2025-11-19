import type { Meta, StoryObj } from "@storybook/react";
import { Clock } from "../components/Clock";

const meta = {
    title: "Clock",
    component: Clock,
    tags: ["autodocs"],
} satisfies Meta<typeof Clock>;

export default meta;
type Story = StoryObj<typeof meta>;

const now = Math.floor(Date.now() / 1000);

export const Active: Story = {
    args: {
        active: true,
        now,
        secondsRemaining: 280,
        startTime: now,
    },
};

export const Inactive: Story = {
    args: {
        active: false,
        now,
        secondsRemaining: 195,
        startTime: now,
    },
};

export const Over: Story = {
    args: {
        active: false,
        now,
        secondsRemaining: 0,
        startTime: now,
    },
};

export const RunningOut: Story = {
    args: {
        active: true,
        now,
        secondsRemaining: 13,
        startTime: now,
    },
};

export const StartedInThePast: Story = {
    args: {
        active: true,
        now,
        secondsRemaining: 140,
        startTime: now - 120,
    },
};

export const OverInThePast: Story = {
    args: {
        active: true,
        now,
        secondsRemaining: 20,
        startTime: now - 120,
    },
};

export const Big: Story = {
    args: {
        active: true,
        now,
        secondsRemaining: 230,
        size: "xl",
        startTime: now,
    },
};
