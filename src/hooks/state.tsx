import { QueryResult, useQuery } from "@apollo/client";
import { State } from "@onchess/core";
import { useEffect, useState } from "react";
import { Hex, hexToString } from "viem";
import { useChainId } from "wagmi";
import { gql } from "../__generated__";
import { Exact, LatestStateQuery } from "../__generated__/graphql";
import { getConfig } from "../util/config";

const LATEST_STATE = gql(/* GraphQL */ `
    query LatestState {
        inputs(last: 1) {
            edges {
                node {
                    index
                    status
                    notices(first: 1) {
                        edges {
                            node {
                                payload
                            }
                        }
                    }
                }
            }
        }
    }
`);

export type StateResponse = QueryResult<
    LatestStateQuery,
    Exact<{
        [key: string]: never;
    }>
> & {
    state?: State;
};

export const useLatestState = (pollInterval: number = 2000): StateResponse => {
    // default initial state depends on chainId
    const chainId = useChainId();

    const [initialized, setInitialized] = useState<boolean>(false);
    const [state, setState] = useState<State>({
        config: getConfig(chainId),
        rake: "0",
        games: {},
        lobby: [],
        players: {},
        vouchers: [],
        isShutdown: false,
    });

    // query for latest input notice, with polling
    const query = useQuery(LATEST_STATE, {
        pollInterval,
    });
    const { data } = query;

    const input = data?.inputs.edges[0]?.node;
    const inputStatus = `${input?.index}:${input?.status}`;
    useEffect(() => {
        // get first notice
        const notice = input?.notices.edges[0]?.node;

        if (notice) {
            // hex string of notice
            const hex = notice.payload as Hex;

            // convert hex string string
            const str = hexToString(hex);

            if (str) {
                // parse JSON
                const obj = JSON.parse(str);
                const state = obj.chess as State;
                setState(state);
                setInitialized(true);
            }
        } else {
            // chain changed, but no state was initialized
            if (!initialized) {
                setState({
                    config: getConfig(chainId),
                    rake: "0",
                    games: {},
                    lobby: [],
                    players: {},
                    vouchers: [],
                    isShutdown: false,
                });
            }
        }
    }, [chainId, inputStatus]); // trigger effect when inputIndex+status changes

    return { ...query, state };
};
