import type { Meta, StoryObj } from "@storybook/react";
import { Account } from "../../components/connect/Account";

const meta = {
    title: "Connect/Account",
    component: Account,
    tags: ["autodocs"],
} satisfies Meta<typeof Account>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
    args: {
        address: "0xD27A20A18496AE3200358E569B107D62a1e3f463",
        ensName: "tuler.eth",
        ensAvatar: "https://ens.xyz/tuler.eth",
    },
};

export const NoAvatar: Story = {
    args: {
        address: "0xD27A20A18496AE3200358E569B107D62a1e3f463",
        ensName: "tuler.eth",
    },
};

export const NoNameOrAvatar: Story = {
    args: {
        address: "0xD27A20A18496AE3200358E569B107D62a1e3f463",
    },
};
