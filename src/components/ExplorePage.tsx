"use client";

import { Stack } from "@mantine/core";
import { State, Token } from "@onchess/core";
import { FC } from "react";
import { Address } from "viem";

import { Games } from "./Games";
import { Leaderboard } from "./Leaderboard";
import { Lobby } from "./Lobby";

export type ExplorePageProps = {
    account?: Address;
    now: number;
    state: State;
    token: Token;
};

export const ExplorePage: FC<ExplorePageProps> = (props) => {
    const { account, now, state, token } = props;
    const { games, lobby, players } = state;
    return (
        <Stack p={20} justify="stretch">
            <Lobby account={account} lobby={lobby} token={token} />
            <Games account={account} games={games} now={now} token={token} />
            <Leaderboard account={account} players={players} />
        </Stack>
    );
};
