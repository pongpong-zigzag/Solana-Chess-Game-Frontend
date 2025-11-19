"use client";
import {
    Badge,
    Button,
    Group,
    Paper,
    Space,
    Stack,
    Text,
    TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Token } from "@onchess/core";
import { IconCircleCheckFilled, IconCornerLeftUp } from "@tabler/icons-react";
import { FC } from "react";
import { formatUnits, parseUnits } from "viem";

export interface DepositProps {
    allowance: string;
    balance: string;
    disabled: boolean;
    executing: boolean;
    onApprove?: (amount: string) => void;
    onApproveAndDeposit?: (amount: string) => void;
    onDeposit?: (amount: string) => void;
    token: Token;
}

export const Deposit: FC<DepositProps> = (props) => {
    const { disabled, executing, onApprove, onApproveAndDeposit, onDeposit } =
        props;
    const { decimals, symbol } = props.token;
    const supportBatch = !!onApproveAndDeposit;

    const form = useForm({
        initialValues: { amount: "" },
        transformValues: ({ amount }) => {
            let parsed = 0n;
            try {
                parsed = parseUnits(amount, decimals);
            } catch {}
            return {
                amount: parsed,
            };
        },
        validate: {
            amount: (value) => {
                try {
                    parseUnits(value, decimals);
                    return null;
                } catch {
                    return "Invalid amount";
                }
            },
        },
        validateInputOnChange: true,
    });

    const allowance = BigInt(props.allowance);
    const balance = BigInt(props.balance);
    const { amount } = form.getTransformedValues();

    const waitAmount = balance > 0n && amount <= 0n;
    const insufficientBalance = balance < amount || balance === 0n;
    const canDeposit = amount > 0n && balance >= amount && allowance >= amount;
    const needApproval = amount > 0n && balance >= amount && allowance < amount;
    return (
        <Stack>
            <Paper p={20} radius="md" bg="gray.1">
                <Stack gap={0}>
                    <TextInput
                        {...form.getInputProps("amount")}
                        disabled={disabled}
                        key={form.key("amount")}
                        label="Deposit"
                        placeholder="0"
                        size="xxl"
                        rightSection={
                            <Badge size="lg" variant="white">
                                {symbol}
                            </Badge>
                        }
                        variant="unstyled"
                    />
                    <Group justify="space-between">
                        {supportBatch ? (
                            <Group gap={3}>
                                <IconCircleCheckFilled
                                    size={16}
                                    color="green"
                                />
                                <Text c="green" size="xs">
                                    batch supported
                                </Text>
                            </Group>
                        ) : (
                            <Space />
                        )}
                        <Group gap={3}>
                            <Text size="xs">{`${formatUnits(balance, decimals)} ${symbol} available`}</Text>
                            <Button
                                disabled={disabled || balance <= 0n}
                                size="compact-xs"
                                variant="transparent"
                                onClick={() =>
                                    form.setFieldValue(
                                        "amount",
                                        formatUnits(balance, decimals),
                                    )
                                }
                            >
                                <Group gap={0}>
                                    <IconCornerLeftUp
                                        color={
                                            disabled || balance <= 0n
                                                ? "lightgray"
                                                : "blue"
                                        }
                                        size={12}
                                    />
                                    <Text size="xs">max</Text>
                                </Group>
                            </Button>
                        </Group>
                    </Group>
                </Stack>
            </Paper>
            {waitAmount && <Button disabled>Enter amount</Button>}
            {insufficientBalance && (
                <Button disabled>Insufficient balance</Button>
            )}
            {needApproval && (
                <Button
                    disabled={disabled}
                    loading={executing}
                    onClick={() => {
                        if (onApproveAndDeposit) {
                            onApproveAndDeposit(amount.toString());
                        } else if (onApprove) {
                            onApprove(amount.toString());
                        }
                    }}
                >
                    {supportBatch ? "Deposit" : "Approve"}
                </Button>
            )}
            {canDeposit && (
                <Button
                    disabled={disabled}
                    loading={executing}
                    onClick={() => {
                        if (onDeposit) {
                            onDeposit(amount.toString());
                        }
                    }}
                >
                    Deposit
                </Button>
            )}
        </Stack>
    );
};
