"use client";

import { SimpleGrid, Stack, StackProps } from "@mantine/core";
import { Game, Token } from "@onchess/core";
import { FC } from "react";
import { Address } from "viem";

import { MiniGameboard, MiniGameboardPlaceholder } from "./MiniGameboard";

export interface GamesProps extends StackProps {
    account?: Address;
    games: Record<Address, Game>;
    now: number;
    token: Token;
}

const inGame = (account: Address, white: Address, black: Address) =>
    white === account || black === account;

export const Games: FC<GamesProps> = (props) => {
    const { account, games, now, token } = props;
    const items = Object.entries(games);

    const sorted = items.sort(([, game1], [, game2]) => {
        if (account) {
            const inGame1 = inGame(account, game1.white, game1.black);
            const inGame2 = inGame(account, game2.white, game2.black);

            // put "my" entries first
            if (inGame1 && inGame2) {
                return game2.updatedAt - game1.updatedAt;
            } else if (inGame1) {
                return -1;
            } else if (inGame2) {
                return 1;
            } else {
                return game2.updatedAt - game1.updatedAt;
            }
        } else {
            return game2.updatedAt - game1.updatedAt;
        }
    });

    return (
        <Stack {...props}>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
                {sorted.length > 0 ? (
                    sorted.map(([address, game], index) => (
                        <MiniGameboard
                            key={index}
                            account={account}
                            address={address as Address}
                            now={now}
                            game={game}
                            token={token}
                        />
                    ))
                ) : (
                    <MiniGameboardPlaceholder />
                )}
            </SimpleGrid>
        </Stack>
    );
};
