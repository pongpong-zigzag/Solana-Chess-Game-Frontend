"use client";

import { Player } from "@onchess/core";
import { useAccount } from "wagmi";
import {
    selectPlayer,
    selectPlayerState,
    useAppSelector,
} from "../providers/state";

export const useConnectedPlayer = (): Player | undefined => {
    const { address } = useAccount();
    const player = useAppSelector((state) => selectPlayer(state, address));
    return player;
};

export const useConnectedPlayerState = () => {
    const { address } = useAccount();
    const state = useAppSelector((state) => selectPlayerState(state, address));
    return state;
};
