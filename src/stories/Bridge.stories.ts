import { Token } from "@onchess/core";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { base, baseSepolia } from "viem/chains";
import { Bridge } from "../components/Bridge";

const meta = {
    title: "Bridge",
    component: Bridge,
    tags: ["autodocs"],
} satisfies Meta<typeof Bridge>;

export default meta;
type Story = StoryObj<typeof meta>;

const token: Token = {
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC
    decimals: 6,
    name: "USD Coin",
    symbol: "USDC",
};

const amount = (amount: number): string =>
    (BigInt(amount) * 10n ** BigInt(token.decimals)).toString();

export const Default: Story = {
    args: {
        allowance: amount(1000000000),
        applicationBalance: amount(10),
        balance: amount(120),
        chain: base,
        disabled: false,
        executing: false,
        onApprove: fn(),
        onDeposit: fn(),
        onWithdraw: fn(),
        token,
    },
};

export const Batch: Story = {
    args: {
        allowance: amount(0),
        applicationBalance: amount(10),
        balance: amount(120),
        chain: base,
        disabled: false,
        executing: false,
        onApproveAndDeposit: fn(),
        onWithdraw: fn(),
        token,
    },
};

export const Testnet: Story = {
    args: {
        allowance: amount(0),
        applicationBalance: amount(10),
        balance: amount(120),
        chain: baseSepolia,
        disabled: false,
        executing: false,
        onApproveAndDeposit: fn(),
        onWithdraw: fn(),
        token,
    },
};

export const Error: Story = {
    args: {
        allowance: amount(0),
        applicationBalance: amount(10),
        balance: amount(120),
        chain: baseSepolia,
        disabled: false,
        error: `Status: 400
URL: https://rpc.zerodev.app/api/v2/bundler/dbd25bfa-5e33-4a58-ad64-8922980a10f8?provider=PIMLICO
Request body: {"method":"wallet_sendCalls","params":[{"calls":[{"data":"0x095ea7b30000000000000000000000009c21aeb2093c32ddbc53eef24b873bdcd1ada1db000000000000000000000000000000000000000000000000000000000007a120","to":"0x036CbD53842c5426634e7929541eC2318f3dCF7e"},{"data":"0x95854b81000000000000000000000000036cbd53842c5426634e7929541ec2318f3dcf7e000000000000000000000000c93796ff6ed6b8d15d68ecb793df221ecf042774000000000000000000000000000000000000000000000000000000000007a12000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000","to":"0x9C21AEb2093C32DDbC53eEF24B873BDCd1aDa1DB"}],"chainId":"0x14a34","from":"0xD669FafC416d2F78d14625AD99b6870AD3F4b79D","version":"1.0"}]}
 
Request Arguments:
  from:  0xD669FafC416d2F78d14625AD99b6870AD3F4b79D

Details: "this request method is not supported"
Version: viem@2.16.1
`,
        executing: false,
        onApproveAndDeposit: fn(),
        onWithdraw: fn(),
        token,
    },
};

export const Disabled: Story = {
    args: {
        allowance: amount(1000000000),
        applicationBalance: amount(10),
        balance: amount(120),
        chain: base,
        disabled: true,
        executing: false,
        onApprove: fn(),
        onDeposit: fn(),
        onWithdraw: fn(),
        token,
    },
};

export const NoBalance: Story = {
    args: {
        allowance: "0",
        applicationBalance: "0",
        balance: "0",
        chain: base,
        disabled: false,
        executing: false,
        onApprove: fn(),
        onDeposit: fn(),
        onWithdraw: fn(),
        token,
    },
};

export const NoAllowance: Story = {
    args: {
        allowance: "0",
        applicationBalance: "0",
        balance: amount(120),
        chain: base,
        disabled: false,
        executing: false,
        onApprove: fn(),
        onDeposit: fn(),
        onWithdraw: fn(),
        token,
    },
};

export const Executing: Story = {
    args: {
        allowance: amount(1000000000),
        applicationBalance: amount(10),
        balance: amount(120),
        chain: base,
        disabled: false,
        executing: true,
        onApprove: fn(),
        onDeposit: fn(),
        onWithdraw: fn(),
        token,
    },
};
