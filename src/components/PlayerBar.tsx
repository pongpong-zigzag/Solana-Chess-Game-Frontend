import { Badge, Button, Group, GroupProps, Switch } from "@mantine/core";
import { Color } from "chess.js";
import { Address } from "viem";
import { getTimeLeft } from "../hooks/clock";
import { Clock } from "./Clock";
import { PlayerText } from "./PlayerText";

export interface PlayerBarProps extends GroupProps {
    address: Address;
    color: Color;
    disabled: boolean;
    now: number;
    onClaimVictory: () => void;
    onCreateSession?: () => void;
    onResign: () => void;
    opponentTime: number;
    player?: Address;
    result: 1 | 0 | 0.5 | undefined;
    sessionExpiry?: number;
    sessionId?: string;
    time: number;
    turn: Color;
    updatedAt: number;
}

export const PlayerBar: React.FC<PlayerBarProps> = (props) => {
    const {
        address,
        color,
        disabled,
        now,
        onClaimVictory,
        onCreateSession,
        onResign,
        opponentTime,
        player,
        result,
        sessionExpiry,
        sessionId,
        time,
        turn,
        updatedAt,
    } = props;

    // show resign button if player is the bar player and game is not over
    const showResign = player === address && result === undefined;

    // isTurn if bar color is turn color and game is not over
    const isTurn = color === turn && result === undefined;

    // calculate opponent time left
    const opponentTimeLeft = getTimeLeft(
        now,
        opponentTime,
        updatedAt,
        turn !== color,
    );

    // show claim button if player is the bar player, it's the other player's turn, and his time is over, and the game is not over
    const showClaimVictory =
        player === address &&
        color !== turn &&
        result === undefined &&
        opponentTimeLeft === 0;

    // show create session if the capability is there
    const showCreateSession =
        player === address && result === undefined && !!onCreateSession;
    const hasSession = !!sessionId && sessionExpiry && now < sessionExpiry;

    const win =
        (color === "w" && result === 1) || (color === "b" && result === 0);

    return (
        <Group justify="space-between">
            <PlayerText address={address} color={color} isTurn={isTurn} />
            {showResign && (
                <Button
                    disabled={disabled}
                    onClick={() => onResign()}
                    size="xs"
                >
                    Resign
                </Button>
            )}
            {showClaimVictory && (
                <Button
                    disabled={disabled}
                    onClick={() => onClaimVictory()}
                    size="xs"
                >
                    Claim Victory
                </Button>
            )}
            {showCreateSession && (
                <Switch
                    defaultChecked={!hasSession}
                    label="Sign every move"
                    onClick={() => onCreateSession()}
                />
            )}
            {win && (
                <Badge bg="yellow" size="lg">
                    Winner
                </Badge>
            )}
            <Clock
                active={isTurn}
                now={now}
                size="lg"
                secondsRemaining={time}
                startTime={updatedAt}
            />
        </Group>
    );
};
