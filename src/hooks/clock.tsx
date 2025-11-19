import { useEffect, useState } from "react";

/**
 * Return the current time in seconds
 * @param resolution how often the clock should update in milliseconds
 * @returns clock in seconds
 */
export const useClock = (resolution: number = 1000) => {
    const [clock, setClock] = useState(Math.floor(Date.now() / 1000));
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Math.floor(Date.now() / 1000);
            setClock(now);
        }, resolution);
        return () => clearInterval(interval);
    }, []);
    return clock;
};

export const getTimeLeft = (
    now: number,
    clock: number,
    lastMove: number,
    active: boolean,
): number => {
    // elapsed time since last move
    const elapsed = now - lastMove;

    // if clock is active (running), calculate time left by subtracting elapsed time from what was on the clock
    // if clock is not active, return the clock as is
    return active ? Math.max(clock - elapsed, 0) : clock;
};
