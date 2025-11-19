import { Address } from "viem";

export const useApplicationAddress = (): Address | undefined => {
    const address = process.env.NEXT_PUBLIC_APPLICATION_ADDRESS;
    if (!address) {
        throw new Error("Missing NEXT_PUBLIC_APPLICATION_ADDRESS");
    }
    return address as Address;
};
