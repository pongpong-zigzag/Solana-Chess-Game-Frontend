import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ConnectedButton } from "../../components/connect/ConnectedButton";
import { Full } from "./Account.stories";
import { Default as DefaultBalance } from "./Balance.stories";

const meta = {
    title: "Connect/ConnectedButton",
    component: ConnectedButton,
    tags: ["autodocs"],
} satisfies Meta<typeof ConnectedButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        ...Full.args,
        ...DefaultBalance.args,
        onClick: fn(),
    },
};
