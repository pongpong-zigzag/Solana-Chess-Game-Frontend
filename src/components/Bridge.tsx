"use client";
import {
    Alert,
    Avatar,
    Center,
    Grid,
    Group,
    SegmentedControl,
    Stack,
    StackProps,
    Text,
    Textarea,
} from "@mantine/core";
import { Token } from "@onchess/core";
import { IconArrowRight } from "@tabler/icons-react";
import { FC, useState } from "react";
import { Chain } from "viem";
import { Deposit } from "./Deposit";
import { Faucet } from "./Faucet";
import { Withdraw } from "./Withdraw";

export interface BridgeProps extends StackProps {
    allowance: string;
    applicationBalance: string;
    balance: string;
    chain: Chain;
    disabled: boolean;
    error?: string;
    executing: boolean;
    onApprove?: (amount: string) => void;
    onApproveAndDeposit?: (amount: string) => void;
    onDeposit?: (amount: string) => void;
    onWithdraw: (amount: string) => void;
    token: Token;
}

export const Bridge: FC<BridgeProps> = (props) => {
    const {
        allowance,
        applicationBalance,
        balance,
        chain,
        disabled,
        error,
        executing,
        onApprove,
        onApproveAndDeposit,
        onDeposit,
        onWithdraw,
        token,
        ...stackProps
    } = props;
    const [operation, setOperation] = useState("deposit");

    return (
        <Stack {...stackProps}>
            {chain.testnet && <Faucet />}
            <SegmentedControl
                data={[
                    { label: "Deposit", value: "deposit" },
                    { label: "Withdraw", value: "withdraw" },
                ]}
                value={operation}
                onChange={setOperation}
                w="100%"
            />
            {operation === "deposit" && (
                <Grid>
                    <Grid.Col span={5}>
                        <Group gap={5} justify="flex-start">
                            <Avatar src="/img/base_icon.svg" size="md" />
                            <Stack gap={0} align="flex-start">
                                <Text size="sm">From</Text>
                                <Text size="sm" fw={800}>
                                    {chain.name}
                                </Text>
                            </Stack>
                        </Group>
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <Center>
                            <IconArrowRight size={30} />
                        </Center>
                    </Grid.Col>
                    <Grid.Col span={5}>
                        <Group gap={5} justify="flex-end">
                            <Stack gap={0} align="flex-end">
                                <Text size="sm">To</Text>
                                <Text size="sm" fw={800}>
                                    OnChess
                                </Text>
                            </Stack>
                            <Avatar src="/img/onchess_logo.png" size="md" />
                        </Group>
                    </Grid.Col>
                </Grid>
            )}
            {operation === "withdraw" && (
                <Grid>
                    <Grid.Col span={5}>
                        <Group gap={5} justify="flex-start">
                            <Avatar src="/img/onchess_logo.png" size="md" />
                            <Stack gap={0} align="flex-start">
                                <Text size="sm">From</Text>
                                <Text size="sm" fw={800}>
                                    OnChess
                                </Text>
                            </Stack>
                        </Group>
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <Center>
                            <IconArrowRight size={30} />
                        </Center>
                    </Grid.Col>
                    <Grid.Col span={5}>
                        <Group gap={5} justify="flex-end">
                            <Stack gap={0} align="flex-end">
                                <Text size="sm">To</Text>
                                <Text size="sm" fw={800}>
                                    {chain.name}
                                </Text>
                            </Stack>
                            <Avatar src="/img/base_icon.svg" size="md" />
                        </Group>
                    </Grid.Col>
                </Grid>
            )}

            {operation === "deposit" && (
                <Deposit
                    allowance={allowance}
                    balance={balance}
                    disabled={disabled}
                    executing={executing}
                    token={token}
                    onApprove={onApprove}
                    onApproveAndDeposit={onApproveAndDeposit}
                    onDeposit={onDeposit}
                />
            )}
            {operation === "withdraw" && (
                <Withdraw
                    applicationBalance={applicationBalance}
                    disabled={disabled}
                    executing={executing}
                    onWithdraw={onWithdraw}
                    token={token}
                />
            )}
            {error && (
                <Alert color="red" title="Error">
                    <Textarea
                        readOnly
                        rows={5}
                        value={error}
                        variant="unstyled"
                    />
                </Alert>
            )}
        </Stack>
    );
};
