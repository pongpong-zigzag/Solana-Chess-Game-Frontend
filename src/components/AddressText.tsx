import {
    ActionIcon,
    CopyButton,
    Group,
    Text,
    TextProps,
    Tooltip,
    rem,
} from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { FC } from "react";
import { Address } from "viem";

export interface AddressTextProps extends TextProps {
    address: Address;
    shorten?: boolean;
    copyButton?: boolean;
}

export const AddressText: FC<AddressTextProps> = (props) => {
    const { address, copyButton = true, shorten = true, ...textProps } = props;
    const text = shorten
        ? address.slice(0, 6).concat("...").concat(address.slice(-4))
        : address;
    const size = textProps.size;
    return (
        <Group gap={2}>
            <Text {...textProps}>{text}</Text>
            {copyButton && (
                <CopyButton value={address} timeout={2000}>
                    {({ copied, copy }) => (
                        <Tooltip
                            label={copied ? "Copied" : "Copy"}
                            withArrow
                            position="right"
                        >
                            <ActionIcon
                                color={copied ? "teal" : "gray"}
                                variant="subtle"
                                size={size}
                                onClick={copy}
                            >
                                {copied ? (
                                    <IconCheck
                                        style={{
                                            width: rem(size === "xs" ? 12 : 16),
                                        }}
                                    />
                                ) : (
                                    <IconCopy
                                        style={{
                                            width: rem(size === "xs" ? 12 : 16),
                                        }}
                                    />
                                )}
                            </ActionIcon>
                        </Tooltip>
                    )}
                </CopyButton>
            )}
        </Group>
    );
};
