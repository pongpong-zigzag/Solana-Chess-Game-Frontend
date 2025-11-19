import type { Meta, StoryObj } from "@storybook/react";
import { MiniGameboard } from "../components/MiniGameboard";

const meta = {
    title: "MiniGameboard",
    component: MiniGameboard,
    tags: ["autodocs"],
} satisfies Meta<typeof MiniGameboard>;

export default meta;
type Story = StoryObj<typeof meta>;

const now = Math.floor(Date.now() / 1000);

export const Default: Story = {
    args: {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        game: {
            address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
            pot: 20000000000000000000n.toString(),
            white: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
            black: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
            pgn: `[Event "Casual Game"]
[Site "OnChess"]
[Date "2023.05.06"]
[Round "-"]
[White "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"]
[Black "0x90F79bf6EB2c4f870365E785982E1f101E93b906"]
[Result "1/2-1/2"]
[WhiteTitle "GM"]
[BlackTitle "GM"]
[WhiteElo "2788"]
[BlackElo "2741"]
[ECO "D27"]
[Opening "QGA"]
[Variation "classical, 6...a6"]
[WhiteFideId "8603677"]
[BlackFideId "623539"]
[EventDate "2023.05.06"]

1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. e3 e6 5. Bxc4 c5 6. O-O a6 7. b3 cxd4 8. Nxd4
Be7 9. Bb2 O-O 10. Be2 b5 11. a4 bxa4 12. Rxa4 Bb7 13. Nd2 Nbd7 14. Qa1 Nc5 15.
Ra5 h6 16. Rc1 Rc8 17. b4 Ncd7 18. Rxc8 Qxc8 19. Bxa6 Bxa6 20. Rxa6 Bxb4 21. Nc6
Qb7 22. Bxf6 Nxf6 23. Nxb4 Qxb4 24. Nf1 Rb8 25. Ra8 Rxa8 26. Qxa8+ Qf8 27. Qxf8+
Kxf8 28. f3 Nd7 29. Kf2 Ke7 30. e4 Nc5 31. Ke3 Nd7 32. Kf2 Nc5 33. Ke3 Nd7 34.
Kf2 1/2-1/2`,
            timeControl: "1500",
            updatedAt: now - 120, // 2 minutes ago
            whiteTime: 690,
            blackTime: 722,
            result: undefined,
        },
        now,
        token: {
            address: "0x92C6bcA388E99d6B304f1Af3c3Cd749Ff0b591e2",
            decimals: 18,
            name: "Test",
            symbol: "TEST",
        },
    },
};
