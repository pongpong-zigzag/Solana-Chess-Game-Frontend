import { ParamCondition } from "@zerodev/permissions/policies";
import { useEffect, useState } from "react";
import { walletActionsErc7715 } from "viem/experimental";
import { useWalletClient } from "wagmi";
import { usePermissionsSupport } from "./capabilities";
import { useApplicationAddress } from "./config";
import { inputBoxAbi, inputBoxAddress } from "./contracts";

type RequestPermissionsAsyncFunc = (expiry: number) => Promise<void>;

export const useSessionId = () => {
    const application = useApplicationAddress();
    const { data: walletClient, status } = useWalletClient();
    const { supported } = usePermissionsSupport();
    const [requestPermissionsAsync, setRequestPermissionsAsync] =
        useState<RequestPermissionsAsyncFunc>(() => () => Promise.resolve());
    const [sessionId, setSessionId] = useState<string | undefined>(undefined);
    const [expiry, setExpiry] = useState<number>(0);

    const requestPermissionsAsyncActive = async (
        expiry: number,
    ): Promise<void> => {
        if (walletClient) {
            const extendedClient = walletClient?.extend(walletActionsErc7715());
            const permissions = await extendedClient.issuePermissions({
                expiry,
                permissions: [
                    {
                        type: "contract-call",
                        data: {
                            permissions: [
                                {
                                    target: inputBoxAddress,
                                    valueLimit: 0n,
                                    abi: inputBoxAbi,
                                    functionName: "addInput",
                                    args: [
                                        {
                                            condition: ParamCondition.EQUAL,
                                            value: application,
                                        },
                                        {
                                            // we don't have a way to limit the scope of the input payload
                                            // so for now session has permission to send any input payload
                                            condition: ParamCondition.NOT_EQUAL,
                                            value: "0x",
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                ],
            });
            if (permissions) {
                // set session id from issued permission context
                setSessionId(permissions.permissionsContext);
                setExpiry(permissions.expiry);
            }
        }
    };

    useEffect(() => {
        if (status == "success" && supported) {
            setRequestPermissionsAsync(() => requestPermissionsAsyncActive);
        }
    }, [status, supported]);

    return { expiry, requestPermissionsAsync, sessionId, supported };
};
