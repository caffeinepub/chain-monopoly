import { useState } from "react";
import { BOARD_SQUARES } from "../../constants/board";
import type { GameView, PlayerView } from "../../types/game";
import BoardSquareCell from "./BoardSquare";
import { PropertyCard } from "./PropertyCard";

interface MonopolyBoardProps {
  game: GameView;
  myId: string | undefined;
  onBuyProperty?: () => void;
  isBuying?: boolean;
}

export const PLAYER_COLORS = [
  {
    bg: "bg-[oklch(var(--mono-red))]",
    hex: "oklch(var(--mono-red))",
    ring: "ring-[oklch(var(--mono-red))]",
    label: "Red",
  },
  {
    bg: "bg-[oklch(var(--mono-light-blue))]",
    hex: "oklch(var(--mono-light-blue))",
    ring: "ring-[oklch(var(--mono-light-blue))]",
    label: "Blue",
  },
  {
    bg: "bg-[oklch(var(--mono-green))]",
    hex: "oklch(var(--mono-green))",
    ring: "ring-[oklch(var(--mono-green))]",
    label: "Green",
  },
  {
    bg: "bg-[oklch(var(--mono-yellow))]",
    hex: "oklch(var(--mono-yellow))",
    ring: "ring-[oklch(var(--mono-yellow))]",
    label: "Yellow",
  },
];

export default function MonopolyBoard({
  game,
  myId,
  onBuyProperty,
  isBuying,
}: MonopolyBoardProps) {
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);

  // Build position → players map
  const positions = new Map<number, PlayerView[]>();
  for (const p of game.players) {
    const pos = Number(p.position);
    if (!positions.has(pos)) positions.set(pos, []);
    positions.get(pos)!.push(p);
  }

  // Build owned map: squareIndex → playerIndex
  const ownedMap = new Map<number, number>();
  for (const prop of game.properties) {
    const ownerIdx = game.players.findIndex(
      (p) => p.id.toText() === prop.owner.toText(),
    );
    ownedMap.set(Number(prop.square), ownerIdx);
  }

  const me = game.players.find((p) => p.id.toText() === myId);
  const myPosition = me ? Number(me.position) : -1;

  const selectedSquareData =
    selectedSquare !== null ? BOARD_SQUARES[selectedSquare] : null;

  const isSelectedOwned =
    selectedSquare !== null ? ownedMap.has(selectedSquare) : false;

  const canBuySelected =
    selectedSquare !== null &&
    selectedSquare === myPosition &&
    !isSelectedOwned &&
    selectedSquareData !== null &&
    selectedSquareData.price !== null &&
    (selectedSquareData.kind === "property" ||
      selectedSquareData.kind === "railroad" ||
      selectedSquareData.kind === "utility");

  // Grid position calculator
  const getGridStyle = (index: number): React.CSSProperties => {
    if (index === 0) return { gridColumn: "11", gridRow: "11" };
    if (index <= 9) return { gridColumn: `${11 - index}`, gridRow: "11" };
    if (index === 10) return { gridColumn: "1", gridRow: "11" };
    if (index <= 19)
      return { gridColumn: "1", gridRow: `${11 - (index - 10)}` };
    if (index === 20) return { gridColumn: "1", gridRow: "1" };
    if (index <= 29) return { gridColumn: `${index - 19}`, gridRow: "1" };
    if (index === 30) return { gridColumn: "11", gridRow: "1" };
    // 31-39: right column top to bottom
    return { gridColumn: "11", gridRow: `${index - 29}` };
  };

  return (
    <div
      className="relative w-full max-w-[640px] aspect-square select-none"
      data-ocid="monopoly-board"
    >
      {/* Board grid */}
      <div
        className="absolute inset-0 bg-[oklch(0.13_0.01_180)] rounded-xl border border-border overflow-hidden"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(11, 1fr)",
          gridTemplateRows: "repeat(11, 1fr)",
        }}
      >
        {BOARD_SQUARES.map((sq) => {
          const playersHere = positions.get(sq.index) ?? [];
          const ownerIdx = ownedMap.get(sq.index) ?? -1;
          const style = getGridStyle(sq.index);
          const isMyPosition = sq.index === myPosition;

          return (
            <BoardSquareCell
              key={sq.index}
              square={sq}
              style={style}
              playersHere={playersHere}
              allPlayers={game.players}
              ownerIdx={ownerIdx}
              isMyPosition={isMyPosition}
              isSelected={selectedSquare === sq.index}
              onClick={() =>
                setSelectedSquare(selectedSquare === sq.index ? null : sq.index)
              }
            />
          );
        })}

        {/* Center */}
        <div
          className="flex flex-col items-center justify-center text-center p-3 pointer-events-none"
          style={{ gridColumn: "2 / 11", gridRow: "2 / 11" }}
        >
          <div className="space-y-1">
            <p className="font-display font-black text-[clamp(14px,3vw,28px)] text-[oklch(var(--mono-yellow))] leading-none tracking-tight">
              CHAIN
            </p>
            <p className="font-display font-black text-[clamp(14px,3vw,28px)] text-foreground leading-none tracking-tight">
              MONOPOLY
            </p>
            <div className="mt-2 flex gap-1 justify-center flex-wrap">
              {game.players.map((p, i) => (
                <div
                  key={p.id.toText()}
                  className={`w-3 h-3 rounded-full border border-border/60 ${PLAYER_COLORS[i]?.bg ?? "bg-muted"}`}
                  title={p.id.toText().slice(0, 8)}
                />
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground font-mono mt-1 opacity-60">
              40 SPACES
            </p>
          </div>
        </div>
      </div>

      {/* Property Card popup */}
      {selectedSquareData && (
        <PropertyCard
          square={selectedSquareData}
          ownerIdx={
            isSelectedOwned ? (ownedMap.get(selectedSquare!) ?? -1) : -1
          }
          canBuy={canBuySelected}
          onBuy={onBuyProperty}
          isBuying={isBuying}
          onClose={() => setSelectedSquare(null)}
        />
      )}
    </div>
  );
}
