import { State } from "@onchess/core";
import { zeroAddress } from "viem";

export default {
    config: {
        eloKFactor: 20,
        owner: zeroAddress,
        rakeDivider: 20,
        token: {
            address: "0x92C6bcA388E99d6B304f1Af3c3Cd749Ff0b591e2",
            decimals: 18,
            name: "Test",
            symbol: "TEST",
        },
    },
    games: {},
    lobby: [],
    messages: {},
    players: {},
    rake: "0",
    vouchers: [],
    isShutdown: false,
} as State;
