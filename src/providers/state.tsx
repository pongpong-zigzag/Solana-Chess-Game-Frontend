"use client";

import chessSlice, { State } from "@onchess/core";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { FC, ReactNode, useRef } from "react";
import { Provider, useDispatch, useSelector, useStore } from "react-redux";
import { getConfig } from "../util/config";

const config = getConfig(31337);
const initialState: State = {
    config,
    games: {},
    lobby: [],
    players: {},
    rake: "0",
    vouchers: [],
    isShutdown: false,
};

const chess = chessSlice(initialState);
const rootReducer = combineSlices(chess);
const makeStore = () => configureStore({ reducer: rootReducer });

export const { create, cancel, deposit, move, resign, claim, withdraw } =
    chess.actions;
export const { selectLobby, selectPlayer, selectPlayerState } = chess.selectors;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export const StateProvider: FC<{ children: ReactNode[] | ReactNode }> = ({
    children,
}) => {
    const storeRef = useRef<AppStore | null>(null);

    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
};
