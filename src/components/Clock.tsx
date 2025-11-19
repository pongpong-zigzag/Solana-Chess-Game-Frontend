"use client";

import { Badge, BadgeProps } from "@mantine/core";
import { FC } from "react";

/**
 * Format seconds to "minutes:seconds"
 * @param seconds number of seconds
 * @returns string formatted as "minutes:seconds"
 */
const format = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = seconds % 60;
    return `${minutes}:${secondsRemainder.toString().padStart(2, "0")}`;
};

export interface ClockProps extends BadgeProps {
    active: boolean; // running or paused
    now: number;
    secondsRemaining: number; // from the startTime
    startTime: number; // start timestamp in seconds
}

export const Clock: FC<ClockProps> = (props) => {
    const { active, now, secondsRemaining, startTime, ...badgeProps } = props;

    // timestamp when the clock should stop
    const overTime = startTime + secondsRemaining;
    const seconds = active ? Math.max(overTime - now, 0) : secondsRemaining;

    // format seconds to "mm:ss"
    const str = format(seconds);

    // red if time is running out, gray if time is over
    const color =
        seconds < 20 ? (seconds > 0 ? "red" : "lightgray") : undefined;

    return (
        <Badge {...badgeProps} variant={active ? "dot" : "default"} c={color}>
            {str}
        </Badge>
    );
};
