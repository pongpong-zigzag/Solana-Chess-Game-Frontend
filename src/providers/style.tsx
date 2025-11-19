"use client";

import { Input, MantineProvider, createTheme } from "@mantine/core";
import { FC, ReactNode } from "react";
import classes from "./style.module.css";

export const theme = createTheme({
    /* Put your mantine theme override here */
    components: {
        Input: Input.extend({ classNames: classes }),
    },
});

export const StyleProvider: FC<{ children: ReactNode[] | ReactNode }> = ({
    children,
}) => {
    return <MantineProvider theme={theme}>{children}</MantineProvider>;
};
