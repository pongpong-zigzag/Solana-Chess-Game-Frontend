"use client";

import { Alert, Box, LoadingOverlay, Stack, Textarea } from "@mantine/core";
import { Game, GameBasePayload, MovePiecePayload, Player } from "@onchess/core";
import { Position } from "chess-fen";
import { Chess } from "chess.js";
import { FC, useEffect, useState } from "react";
import {
    BoardTheme,
    ChessBoard,
    ChessBoardDndProvider,
    MoveHandler,
    PromotionView,
    SquareRendererFunc,
    defaultRenderSquare,
} from "react-fen-chess-board";
import { PlayerBar } from "./PlayerBar";

export type GameboardProps = {
    error?: string;
    game: Game;
    submitting: boolean;
    now: number;
    onClaimVictory: (params: Omit<GameBasePayload, "metadata">) => void;
    onCreateSession?: () => void;
    onMove: (params: Omit<MovePiecePayload, "metadata" | "sender">) => void;
    onResign: (params: Omit<GameBasePayload, "metadata">) => void;
    player?: Player; // optional, so we can support "expectators"
    sessionExpiry?: number;
    sessionId?: string;
};

export interface Promotion {
    from: Position;
    to: Position;
}

function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return String(error);
}

export const Gameboard: FC<GameboardProps> = (props) => {
    const {
        error,
        game,
        now,
        onClaimVictory,
        onCreateSession,
        onMove,
        onResign,
        player,
        sessionExpiry,
        sessionId,
        submitting,
    } = props;

    // create a Chess instance and load the PGN
    const chess = new Chess();
    try {
        chess.loadPgn(game.pgn);
    } catch {
        // XXX: do what?
        // XXX: happened when player resigns before any move
    }
    const turn = chess.turn();
    const result = game.result;

    // connected user is white player
    const isWhite = player?.address === game.white;

    // connected user is black player
    const isBlack = player?.address === game.black;

    // rotate board if black is playing
    const rotated = isBlack;

    const whiteTurn = isWhite && turn === "w" && result === undefined;
    const blackTurn = isBlack && turn === "b" && result === undefined;
    const playerTurn = whiteTurn || blackTurn;

    const [promotion, setPromotion] = useState<Promotion | null>(null);
    const [fen, setFen] = useState(chess.fen());
    useEffect(() => {
        const fen = chess.fen();
        setFen(fen);
    }, [game.pgn]);

    const handleClaimVictory = () => onClaimVictory({ address: game.address });
    const handleResign = () => onResign({ address: game.address });

    // players bars
    const whiteBar = (
        <PlayerBar
            address={game.white}
            color="w"
            disabled={submitting}
            now={now}
            onResign={handleResign}
            onClaimVictory={handleClaimVictory}
            onCreateSession={onCreateSession}
            opponentTime={game.blackTime}
            player={player?.address}
            result={result}
            sessionExpiry={sessionExpiry}
            sessionId={sessionId}
            time={game.whiteTime}
            turn={turn}
            updatedAt={game.updatedAt}
        />
    );

    const blackBar = (
        <PlayerBar
            address={game.black}
            color="b"
            disabled={submitting}
            now={now}
            onResign={handleResign}
            onClaimVictory={handleClaimVictory}
            onCreateSession={onCreateSession}
            opponentTime={game.whiteTime}
            player={player?.address}
            result={result}
            sessionExpiry={sessionExpiry}
            sessionId={sessionId}
            time={game.blackTime}
            turn={turn}
            updatedAt={game.updatedAt}
        />
    );

    // change default board theme
    const boardTheme: BoardTheme = {
        darkSquare: "#b58863",
        lightSquare: "#f0d9b5",
    };

    // this is the move handler that will be called when a move is made
    const moveHandler: MoveHandler = (props) => {
        const { fromPosition, toPosition, board } = props;

        if (board.isPromotion(fromPosition, toPosition)) {
            setPromotion({
                from: fromPosition,
                to: toPosition,
            });
            return;
        }

        try {
            const move = chess.move({
                from: fromPosition.toCoordinate(),
                to: toPosition.toCoordinate(),
            });
            setFen(chess.fen());
            onMove({ address: game.address, move: move.san });
        } catch (error) {
            console.warn(getErrorMessage(error));
        }
    };

    // render square function that is able to handle promotions
    const renderSquare: SquareRendererFunc = (props) => {
        if (promotion && promotion.to.equals(props.position)) {
            return (
                <PromotionView
                    key={props.position.toCoordinate()}
                    onClose={() => setPromotion(null)}
                    onPromotion={(piece) => {
                        const move = chess.move({
                            from: promotion.from.toCoordinate(),
                            to: promotion.to.toCoordinate(),
                            promotion: piece.toLowerCase(),
                        });
                        onMove({
                            address: game.address,
                            move: move.san,
                        });
                        setPromotion(null);
                    }}
                    {...props}
                />
            );
        }

        return defaultRenderSquare(props);
    };

    return (
        <Stack miw={600}>
            {error && (
                <Alert color="red" title="Error">
                    <Textarea
                        readOnly
                        rows={5}
                        value={error}
                        variant="unstyled"
                    />
                </Alert>
            )}
            {!rotated && blackBar}
            {rotated && whiteBar}
            <ChessBoardDndProvider>
                <Box pos="relative">
                    <LoadingOverlay
                        visible={submitting}
                        zIndex={1000}
                        overlayProps={{
                            backgroundOpacity: 0.3,
                        }}
                    />
                    <ChessBoard
                        fen={fen}
                        rotated={rotated}
                        boardTheme={boardTheme}
                        onMove={playerTurn ? moveHandler : undefined}
                        renderSquare={renderSquare}
                    />
                </Box>
            </ChessBoardDndProvider>
            {rotated && blackBar}
            {!rotated && whiteBar}
        </Stack>
    );
};
