import { Avatar, Group, Stack, Text } from "@mantine/core";
import Jazzicon from "@raugfer/jazzicon";
import { FC } from "react";
import { Address } from "viem";
import { AddressText } from "../AddressText";

// builds an image data url for embedding
function buildDataUrl(address: Address): string {
    return "data:image/svg+xml;base64," + btoa(Jazzicon(address));
}

export type AccountProps = {
    address: Address;
    ensName?: string | null;
    ensAvatar?: string | null;
};

export const Account: FC<AccountProps> = (props) => {
    const { address, ensName, ensAvatar } = props;

    // use user avatar, or generate a jazzicon
    const avatar = ensAvatar || buildDataUrl(address);

    // if ensName is present, use a larger avatar because there are two text lines
    const avatarSize = ensName ? "md" : "sm";

    return (
        <Group gap="xs">
            <Avatar src={avatar} size={avatarSize} />
            <Stack gap={0}>
                <Text size="md">{ensName}</Text>
                <AddressText address={address} size={ensName ? "xs" : "md"} />
            </Stack>
        </Group>
    );
};
