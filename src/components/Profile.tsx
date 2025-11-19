import { SimpleGrid } from "@mantine/core";
import { Player } from "@onchess/core";
import { FC } from "react";
import { Stat } from "./Stat";

export interface ProfileProps {
    player: Player;
}

export const Profile: FC<ProfileProps> = ({ player }) => {
    return (
        <SimpleGrid cols={4}>
            <Stat name="Rating" value={player.rating} />
            <Stat name="Wins" value={player.wins} />
            <Stat name="Losses" value={player.losses} />
            <Stat name="Draws" value={player.draws} />
        </SimpleGrid>
    );
};
