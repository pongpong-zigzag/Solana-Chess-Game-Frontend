import { Group, Paper, Stack, Text, Title } from "@mantine/core";
import { Icon } from "@tabler/icons-react";
import { FC } from "react";

export interface StatProps {
    name: string;
    value: number;
    icon?: Icon;
}

export const Stat: FC<StatProps> = ({ name, value, icon }) => {
    return (
        <Paper p={20} withBorder>
            <Stack gap={0}>
                <Group>
                    <Text size="sm">{name}</Text>
                </Group>
                <Title order={2}>{value}</Title>
            </Stack>
        </Paper>
    );
};
