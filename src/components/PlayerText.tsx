import { ColorSwatch, Group } from "@mantine/core";
import { Color } from "chess.js";
import { FC } from "react";
import { Address } from "viem";
import { AddressText } from "./AddressText";

export type PlayerTextProps = {
    address: Address;
    color: Color;
    isTurn?: boolean;
};

export const PlayerText: FC<PlayerTextProps> = ({ address, color, isTurn }) => {
    return (
        <Group gap={5} wrap="nowrap">
            <ColorSwatch color={color === "w" ? "white" : "black"} size={20} />
            <AddressText
                address={address}
                shorten
                ff="monospace"
                size="sm"
                fw={isTurn === true ? 800 : 200}
            />
        </Group>
    );
};
