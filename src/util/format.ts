import { Token, parseTimeControl } from "@onchess/core";
import humanizeDuration from "humanize-duration";
import { formatUnits } from "viem";

const shortEnglishHumanizer = humanizeDuration.humanizer({
    language: "shortEn",
    languages: {
        shortEn: {
            y: () => "y",
            mo: () => "mo",
            w: () => "w",
            d: () => "d",
            h: () => "h",
            m: () => "min",
            s: () => "s",
            ms: () => "ms",
        },
    },
});

export const formatTimeControl = (time: string) => {
    const [seconds, increment] = parseTimeControl(time);
    if (increment > 0) {
        return `${shortEnglishHumanizer(seconds * 1000)} + ${shortEnglishHumanizer(increment * 1000)}`;
    } else {
        return `${shortEnglishHumanizer(seconds * 1000, {})}`;
    }
};

export const formatAmount = (bet: bigint, token: Token) =>
    `${formatUnits(bet, token.decimals)} ${token.symbol}`;
