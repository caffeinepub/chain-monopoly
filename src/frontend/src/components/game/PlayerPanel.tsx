import { Crown, Gavel, Skull } from "lucide-react";
import { BOARD_SQUARES } from "../../constants/board";
import type { GameView, PlayerView } from "../../types/game";
import { GamePhase } from "../../types/game";
import PlayerToken from "../board/PlayerToken";
import { Badge } from "../ui/badge";

interface PlayerPanelProps {
  game: GameView;
  myId: string | undefined;
}

interface PlayerRowProps {
  player: PlayerView;
  playerIndex: number;
  isMe: boolean;
  isCurrentTurn: boolean;
  isHost: boolean;
}

function formatPrincipal(id: string): string {
  if (id.length <= 12) return id;
  return `${id.slice(0, 6)}…${id.slice(-4)}`;
}

function PlayerRow({
  player,
  playerIndex,
  isMe,
  isCurrentTurn,
  isHost,
}: PlayerRowProps) {
  const positionName =
    BOARD_SQUARES[Number(player.position)]?.name ?? `Space ${player.position}`;
  const shortId = isMe ? "You" : formatPrincipal(player.id.toText());

  return (
    <div
      className={[
        "flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all duration-200",
        isCurrentTurn
          ? "border-primary/40 bg-primary/10"
          : "border-transparent bg-muted/30",
        player.isBankrupt ? "opacity-40" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-ocid={`player-panel-row-${playerIndex}`}
    >
      {/* Token */}
      <div className="shrink-0">
        <PlayerToken
          playerIndex={playerIndex}
          size="md"
          isActive={isCurrentTurn}
          isMe={isMe}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="font-mono text-xs text-foreground font-semibold truncate max-w-[100px]">
            {shortId}
          </span>
          {isHost && (
            <Crown className="w-3 h-3 text-[oklch(var(--mono-yellow))] shrink-0" />
          )}
          {isCurrentTurn && (
            <Badge
              variant="default"
              className="text-[9px] px-1 py-0 h-4 shrink-0"
            >
              TURN
            </Badge>
          )}
        </div>
        <p className="text-[10px] text-muted-foreground font-body truncate mt-0.5">
          {positionName}
        </p>
      </div>

      {/* Status badges */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="font-mono text-xs text-foreground font-bold">
          ${Number(player.cash).toLocaleString()}
        </span>
        <div className="flex gap-1">
          {player.inJail && (
            <span title="In Jail" aria-label="In Jail">
              <Gavel className="w-3 h-3 text-[oklch(var(--mono-red))]" />
            </span>
          )}
          {player.isBankrupt && (
            <span title="Bankrupt" aria-label="Bankrupt">
              <Skull className="w-3 h-3 text-muted-foreground" />
            </span>
          )}
          {!player.isReady && (
            <Badge variant="warning" className="text-[9px] px-1 py-0 h-4">
              Not Ready
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

export function PlayerPanel({ game, myId }: PlayerPanelProps) {
  const activePlayers = game.players.filter((p) => !p.isBankrupt);
  const bankruptPlayers = game.players.filter((p) => p.isBankrupt);

  return (
    <div className="flex flex-col gap-2" data-ocid="player-panel">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">
          Players
        </p>
        <Badge variant="muted" className="text-[10px]">
          {activePlayers.length}/{game.players.length} active
        </Badge>
      </div>

      {/* Active players */}
      <div className="space-y-1.5">
        {game.players.map((player, i) => {
          if (player.isBankrupt) return null;
          return (
            <PlayerRow
              key={player.id.toText()}
              player={player}
              playerIndex={i}
              isMe={player.id.toText() === myId}
              isCurrentTurn={
                game.phase === GamePhase.Playing && Number(game.turnIndex) === i
              }
              isHost={player.id.toText() === game.host.toText()}
            />
          );
        })}
      </div>

      {/* Bankrupt players */}
      {bankruptPlayers.length > 0 && (
        <div className="mt-1 space-y-1">
          <p className="text-[10px] font-display font-medium text-muted-foreground/60 uppercase tracking-wider px-1">
            Eliminated
          </p>
          {game.players.map((player, i) => {
            if (!player.isBankrupt) return null;
            return (
              <PlayerRow
                key={player.id.toText()}
                player={player}
                playerIndex={i}
                isMe={player.id.toText() === myId}
                isCurrentTurn={false}
                isHost={false}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
