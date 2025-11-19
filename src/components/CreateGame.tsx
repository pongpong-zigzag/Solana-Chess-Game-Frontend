"use client";

import {
    Alert,
    Button,
    Group,
    Paper,
    PaperProps,
    RangeSlider,
    SegmentedControl,
    Stack,
    Text,
    Textarea,
} from "@mantine/core";
import { CreateGamePayload, INITIAL_RATING, Player } from "@onchess/core";
import { IconClock, IconCoin, IconStar } from "@tabler/icons-react";
import { FC, useState } from "react";
import { formatUnits, parseUnits } from "viem";
import { formatTimeControl } from "../util/format";

export interface CreateGameProps extends PaperProps {
    error?: string;
    player?: Player;
    decimals: number;
    executing: boolean;
    symbol: string;
    onConnect?: () => {};
    onCreate: (params: Omit<CreateGamePayload, "metadata">) => void;
}

export const timeControls = ["1500", "2700", "1500+10", "2700+10"];

export const CreateGame: FC<CreateGameProps> = (props) => {
    const {
        decimals,
        executing,
        error,
        onConnect,
        onCreate,
        player,
        symbol,
        ...otherProps
    } = props;

    // player balance
    const balance = player ? BigInt(player.balance) : undefined;

    // possible bets
    const bets = ["0.5", "1", "5"].map((v) => parseUnits(v, decimals));
    const betFormat = (value: bigint) => (
        <Text>
            {formatUnits(value, decimals)} {symbol}
        </Text>
    );

    // bet
    const [bet, setBet] = useState(bets[0].toString());

    // supported time controls
    const [timeControl, setTimeControl] = useState(timeControls[0]);

    // opponent rating
    const playerRating = player ? player.rating : INITIAL_RATING;
    const minRating = Math.max(0, playerRating - 300);
    const maxRating = Math.min(3000, playerRating + 300);
    const [rating, setRating] = useState<[number, number]>([
        minRating,
        maxRating,
    ]);

    return (
        <Paper {...otherProps} p={20} withBorder>
            <Stack justify="space-around" gap={30}>
                <Stack gap={5}>
                    <Group gap={5}>
                        <IconCoin size={16} />
                        <Text fw={800}>Bet</Text>
                    </Group>
                    <SegmentedControl
                        value={bet}
                        onChange={setBet}
                        data={bets.map((v) => ({
                            value: v.toString(),
                            label: betFormat(v),
                        }))}
                    />
                </Stack>
                <Stack gap={5}>
                    <Group gap={5}>
                        <IconClock size={16} />
                        <Text fw={800}>Time Control</Text>
                    </Group>
                    <SegmentedControl
                        value={timeControl}
                        onChange={setTimeControl}
                        data={timeControls.map((value) => ({
                            value,
                            label: formatTimeControl(value),
                        }))}
                    />
                </Stack>
                <Stack gap={5}>
                    <Group gap={5}>
                        <IconStar size={16} />
                        <Text fw={800}>Opponent Rating</Text>
                    </Group>
                    <RangeSlider
                        mt={40}
                        min={0}
                        max={3000}
                        minRange={200}
                        precision={0}
                        step={10}
                        value={rating}
                        onChange={setRating}
                        labelAlwaysOn
                    />
                </Stack>
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
                <Group>
                    {player &&
                        balance !== undefined &&
                        BigInt(bet) <= balance && (
                            <Button
                                loading={executing}
                                onClick={() => {
                                    onCreate({
                                        bet,
                                        timeControl,
                                        minRating: rating[0],
                                        maxRating: rating[1],
                                    });
                                }}
                            >
                                Play
                            </Button>
                        )}
                    {player &&
                        balance !== undefined &&
                        BigInt(bet) > balance && (
                            <Button disabled>Insufficient balance</Button>
                        )}
                    {!player && onConnect && (
                        <Button onClick={onConnect}>Connect</Button>
                    )}
                </Group>
            </Stack>
        </Paper>
    );
};
