"use client";

import {
    ActionIcon,
    Anchor,
    Button,
    Center,
    Group,
    Image,
    Stack,
    Text,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconBrandGithub, IconBrandX } from "@tabler/icons-react";
import Link from "next/link";
import { FC } from "react";

export const ComingSoon: FC = () => {
    const { height } = useViewportSize();
    return height > 0 ? (
        <Stack h={height} align="stretch" justify="space-around">
            <Center />
            <Group align="baseline" justify="center">
                <Image src="/img/knight.png" h={300} />
                <Text ff="Cardo" fz={96} c="#273053" visibleFrom="md">
                    OnChess
                </Text>
            </Group>
            <Stack gap={20}>
                <Group gap={5} justify="center">
                    <Text>coming on</Text>
                    <Anchor href="https://base.org">
                        <Image src="/img/base_icon.svg" h="20px" w="20px" />
                    </Anchor>
                    <Text>powered by</Text>
                    <Anchor href="https://cartesi.io">
                        <Image src="/img/cartesi_icon.svg" h="20px" w="20px" />
                    </Anchor>
                </Group>
                <Group justify="center">
                    <Link href="https://preview.onchess.xyz/play">
                        <Button variant="gradient">Playtest</Button>
                    </Link>
                </Group>
                <Group justify="center">
                    <Anchor href="https://x.com/OnChessProject" target="_blank">
                        <ActionIcon
                            size="lg"
                            color="gray"
                            variant="subtle"
                            radius="lg"
                        >
                            <IconBrandX
                                style={{ width: "70%", height: "70%" }}
                                stroke={1.5}
                            />
                        </ActionIcon>
                    </Anchor>
                    <Anchor href="https://github.com/onchess" target="_blank">
                        <ActionIcon
                            size="lg"
                            color="gray"
                            variant="subtle"
                            radius="lg"
                        >
                            <IconBrandGithub
                                style={{ width: "70%", height: "70%" }}
                                stroke={1.5}
                            />
                        </ActionIcon>
                    </Anchor>
                </Group>
            </Stack>
        </Stack>
    ) : (
        <></>
    );
};
