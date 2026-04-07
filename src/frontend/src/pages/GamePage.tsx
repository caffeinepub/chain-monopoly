import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { CheckCircle, Crown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MonopolyBoard from "../components/board/MonopolyBoard";
import { DiceRoller } from "../components/game/DiceRoller";
import { EventLog } from "../components/game/EventLog";
import { PlayerPanel } from "../components/game/PlayerPanel";
import { PropertyAction } from "../components/game/PropertyAction";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { BOARD_SQUARES } from "../constants/board";
import { useAuth } from "../hooks/useAuth";
import { useBackend } from "../hooks/useBackend";
import { GamePhase } from "../types/game";
import type { GameView, PlayerView } from "../types/game";

export default function GamePage() {
  const { gameId } = useParams({ from: "/game/$gameId" });
  const { principal } = useAuth();
  const backend = useBackend();
  const queryClient = useQueryClient();

  const [diceResult, setDiceResult] = useState<{
    die1: number;
    die2: number;
  } | null>(null);
  // Tracks whether THIS player rolled this turn and hasn't yet resolved the buy/pass decision.
  // Decoupled from isMyTurn because the backend advances turnIndex immediately after roll,
  // which would otherwise cause isMyTurn to be false before the player can buy.
  const [hasRolledThisTurn, setHasRolledThisTurn] = useState(false);
  const [passedProperty, setPassedProperty] = useState(false);

  const {
    data: game,
    isLoading,
    error,
  } = useQuery<GameView | null>({
    queryKey: ["game", gameId],
    queryFn: () => backend.getGame(gameId),
    enabled: backend.isReady && !!gameId,
    refetchInterval: 2000,
  });

  const myId = principal?.toText();
  const me = game?.players.find((p) => p.id.toText() === myId);
  const isMyTurn =
    game != null &&
    game.phase === GamePhase.Playing &&
    game.players[Number(game.turnIndex)]?.id.toText() === myId;

  // Reset buy-decision state whenever the turn advances to a new player.
  // This ensures passedProperty and hasRolledThisTurn never bleed across turns.
  const prevTurnIndexRef = useRef<number | null>(null);
  const turnIndex = game != null ? Number(game.turnIndex) : null;
  useEffect(() => {
    if (turnIndex == null) return;
    if (
      prevTurnIndexRef.current !== null &&
      prevTurnIndexRef.current !== turnIndex
    ) {
      setPassedProperty(false);
      setHasRolledThisTurn(false);
    }
    prevTurnIndexRef.current = turnIndex;
  }, [turnIndex]);

  const readyMutation = useMutation({
    mutationFn: () => backend.setReady(gameId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["game", gameId] }),
  });

  const rollMutation = useMutation({
    mutationFn: () => backend.rollDice(gameId),
    onSuccess: (result) => {
      if (result.__kind__ === "Ok") {
        setDiceResult({
          die1: Number(result.Ok.die1),
          die2: Number(result.Ok.die2),
        });
        // Mark that this player has rolled and is awaiting a buy/pass decision.
        // Do NOT rely on isMyTurn here — the backend may have already advanced turnIndex.
        setHasRolledThisTurn(true);
        setPassedProperty(false);
        queryClient.invalidateQueries({ queryKey: ["game", gameId] });
      }
    },
  });

  const buyMutation = useMutation({
    mutationFn: () => backend.buyProperty(gameId),
    onSuccess: () => {
      // Clear the pending buy state after a successful purchase
      setHasRolledThisTurn(false);
      setPassedProperty(false);
      queryClient.invalidateQueries({ queryKey: ["game", gameId] });
    },
  });

  const passMutation = useMutation({
    mutationFn: () => backend.passProperty(gameId),
    onSuccess: () => {
      setHasRolledThisTurn(false);
      setPassedProperty(true);
      queryClient.invalidateQueries({ queryKey: ["game", gameId] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" label="Loading game…" />
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh] px-4">
        <ErrorMessage message="Game not found or failed to load." />
      </div>
    );
  }

  const currentSquare = me ? BOARD_SQUARES[Number(me.position)] : null;
  // canBuy checks BOTH hasRolledThisTurn (client-side signal set on roll) AND
  // game.pendingBuySquare (server-side signal) so the prompt persists even if
  // polling resets hasRolledThisTurn before the player makes a decision.
  const serverPendingBuy = game.pendingBuySquare != null;
  const canBuy =
    (hasRolledThisTurn || serverPendingBuy) &&
    !passedProperty &&
    currentSquare != null &&
    (currentSquare.kind === "property" ||
      currentSquare.kind === "railroad" ||
      currentSquare.kind === "utility") &&
    !game.properties.some((p) => Number(p.square) === Number(me?.position));

  const winner =
    game.phase === GamePhase.Finished
      ? game.players.find((p) => !p.isBankrupt)
      : null;

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-background overflow-hidden relative">
      {/* Board area */}
      <div className="flex-1 flex items-center justify-center p-4 bg-muted/10 border-b lg:border-b-0 lg:border-r border-border overflow-hidden min-h-[280px]">
        <MonopolyBoard
          game={game}
          myId={myId}
          onBuyProperty={() => buyMutation.mutate()}
          isBuying={buyMutation.isPending}
        />
      </div>

      {/* Side panel */}
      <div className="w-full lg:w-80 flex flex-col bg-card border-l border-border overflow-y-auto max-h-[calc(100vh-56px)]">
        {/* Game header */}
        <div className="border-b border-border px-4 py-3 shrink-0">
          <div className="flex items-center justify-between mb-1">
            <span className="font-display font-bold text-sm text-foreground">
              Game{" "}
              <span className="font-mono text-xs text-muted-foreground">
                #{gameId.slice(0, 8)}
              </span>
            </span>
            <Badge
              variant={game.phase === GamePhase.Playing ? "success" : "muted"}
            >
              {game.phase}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            Stake: {game.stakeAmount.toString()} {game.currency} ·{" "}
            {game.players.length} players
          </p>
        </div>

        {/* Players panel */}
        <div className="border-b border-border px-3 py-3 shrink-0">
          <PlayerPanel game={game} myId={myId} />
        </div>

        {/* Controls */}
        <div className="px-4 py-4 space-y-3 shrink-0 border-b border-border">
          {/* Lobby */}
          {game.phase === GamePhase.Lobby && me && !me.isReady && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-body text-center">
                {game.players.filter((p) => p.isReady).length}/
                {game.players.length} players ready
              </p>
              <Button
                variant="gold"
                className="w-full font-display font-bold"
                onClick={() => readyMutation.mutate()}
                loading={readyMutation.isPending}
                data-ocid="ready-btn"
              >
                <CheckCircle className="w-4 h-4" />
                Mark Ready
              </Button>
            </div>
          )}

          {game.phase === GamePhase.Lobby && me?.isReady && (
            <div
              className="flex items-center justify-center gap-2 py-2"
              data-ocid="ready-status"
            >
              <CheckCircle className="w-4 h-4 text-[oklch(var(--mono-green))]" />
              <span className="text-sm font-display font-semibold text-[oklch(var(--mono-green))]">
                You are Ready
              </span>
            </div>
          )}

          {game.phase === GamePhase.Lobby && !me && (
            <p className="text-xs text-muted-foreground font-body text-center py-2">
              Spectating this game.
            </p>
          )}

          {/* Playing phase — dice roller + property action */}
          {game.phase === GamePhase.Playing && (
            <div className="space-y-3">
              <DiceRoller
                isMyTurn={isMyTurn}
                isRolling={rollMutation.isPending}
                lastResult={diceResult}
                onRoll={() => rollMutation.mutate()}
              />

              {rollMutation.error && (
                <ErrorMessage message="Roll failed. Please try again." />
              )}

              {canBuy && currentSquare && me && (
                <PropertyAction
                  square={currentSquare}
                  playerCash={me.cash}
                  isBuying={buyMutation.isPending}
                  onBuy={() => buyMutation.mutate()}
                  onPass={() => passMutation.mutate()}
                />
              )}

              {!isMyTurn && !hasRolledThisTurn && (
                <p className="text-center text-xs text-muted-foreground font-body py-1">
                  Waiting for{" "}
                  <span className="text-foreground font-semibold font-mono">
                    {game.players[Number(game.turnIndex)]?.id
                      .toText()
                      .slice(0, 8)}
                    …
                  </span>
                </p>
              )}
            </div>
          )}

          {game.phase === GamePhase.Finished && (
            <div className="text-center py-2 space-y-1">
              <p className="font-display font-bold text-base text-foreground">
                Game Finished
              </p>
              <p className="text-xs text-muted-foreground font-body">
                Winner receives the full pot via on-chain payout.
              </p>
            </div>
          )}
        </div>

        {/* Event log — fills remaining space */}
        <div className="flex-1 flex flex-col min-h-[200px]">
          <EventLog events={game.events} myId={myId} />
        </div>
      </div>

      {/* Winner overlay */}
      {winner && (
        <WinnerOverlay
          winner={winner}
          isMe={winner.id.toText() === myId}
          potAmount={game.stakeAmount * BigInt(game.players.length)}
          currency={game.currency}
        />
      )}
    </div>
  );
}

// ---- Winner Overlay ----

function WinnerOverlay({
  winner,
  isMe,
  potAmount,
  currency,
}: {
  winner: PlayerView;
  isMe: boolean;
  potAmount: bigint;
  currency: string;
}) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div
      className="absolute inset-0 bg-[oklch(0_0_0/0.75)] flex items-center justify-center z-50 backdrop-blur-sm"
      data-ocid="winner-overlay"
    >
      <div className="bg-card border border-border rounded-xl p-8 max-w-sm w-full mx-4 text-center space-y-4 shadow-2xl">
        <div className="flex justify-center">
          <Crown className="w-12 h-12 text-[oklch(var(--mono-yellow))]" />
        </div>
        <div>
          <p className="font-display font-black text-2xl text-foreground leading-tight">
            {isMe ? "You Won!" : "Game Over"}
          </p>
          <p className="text-sm text-muted-foreground font-body mt-1">
            {isMe
              ? "Congratulations — last player standing!"
              : `${winner.id.toText().slice(0, 12)}… wins`}
          </p>
        </div>

        <div className="bg-muted/40 rounded-lg px-4 py-3 space-y-1">
          <p className="text-xs text-muted-foreground font-body">Total pot</p>
          <p className="font-mono font-bold text-xl text-[oklch(var(--mono-yellow))]">
            {potAmount.toString()} {currency}
          </p>
          {isMe && (
            <p className="text-xs text-[oklch(var(--mono-green))] font-body">
              ✓ On-chain payout confirmed
            </p>
          )}
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => setDismissed(true)}
          data-ocid="dismiss-winner-btn"
        >
          View Final Board
        </Button>
      </div>
    </div>
  );
}
