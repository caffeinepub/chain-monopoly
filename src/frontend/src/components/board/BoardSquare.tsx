import type React from "react";
import { COLOR_GROUP_HEX } from "../../constants/board";
import type { BoardSquare, PlayerView } from "../../types/game";
import { PLAYER_COLORS } from "./MonopolyBoard";
import PlayerToken from "./PlayerToken";

interface BoardSquareProps {
  square: BoardSquare;
  style: React.CSSProperties;
  playersHere: PlayerView[];
  allPlayers: PlayerView[];
  ownerIdx: number;
  isMyPosition: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const CORNER_INDICES = new Set([0, 10, 20, 30]);

const ICONS: Record<string, string> = {
  go: "→",
  jail: "⚖",
  "free-parking": "P",
  "go-to-jail": "!",
  chance: "?",
  "community-chest": "♥",
  tax: "$",
  railroad: "🚂",
  utility: "⚡",
};

export default function BoardSquareCell({
  square,
  style,
  playersHere,
  allPlayers,
  ownerIdx,
  isMyPosition,
  isSelected,
  onClick,
}: BoardSquareProps) {
  const isCorner = CORNER_INDICES.has(square.index);
  const colorHex = square.colorGroup
    ? COLOR_GROUP_HEX[square.colorGroup]
    : null;
  const ownerColor = ownerIdx >= 0 ? PLAYER_COLORS[ownerIdx] : null;
  const icon = ICONS[square.kind];

  // Stripe direction based on position
  const getStripePos = () => {
    // bottom row (0-10): stripe at top
    if (square.index <= 10) return "top";
    // left col (11-19): stripe at right
    if (square.index <= 19) return "right";
    // top row (20-30): stripe at bottom
    if (square.index <= 30) return "bottom";
    // right col (31-39): stripe at left
    return "left";
  };

  const stripePos = getStripePos();
  const stripeStyle: React.CSSProperties = {};
  if (colorHex) {
    if (stripePos === "top")
      Object.assign(stripeStyle, {
        top: 0,
        left: 0,
        right: 0,
        height: "22%",
        background: colorHex,
      });
    if (stripePos === "bottom")
      Object.assign(stripeStyle, {
        bottom: 0,
        left: 0,
        right: 0,
        height: "22%",
        background: colorHex,
      });
    if (stripePos === "left")
      Object.assign(stripeStyle, {
        left: 0,
        top: 0,
        bottom: 0,
        width: "22%",
        background: colorHex,
      });
    if (stripePos === "right")
      Object.assign(stripeStyle, {
        right: 0,
        top: 0,
        bottom: 0,
        width: "22%",
        background: colorHex,
      });
  }

  // Name shortening for tiny cells
  const shortName = () => {
    if (isCorner)
      return square.name
        .split(" ")
        .map((w) => w[0])
        .join("");
    const parts = square.name.split(" ");
    if (parts.length === 1) return parts[0].slice(0, 5);
    return parts.map((w) => w.slice(0, 3)).join(" ");
  };

  return (
    <button
      type="button"
      className={[
        "relative flex flex-col items-center justify-center overflow-hidden transition-all duration-150 cursor-pointer",
        "border border-[oklch(0.22_0_0)]",
        isCorner ? "bg-[oklch(0.17_0.02_270)]" : "bg-[oklch(0.14_0.005_180)]",
        isMyPosition
          ? "ring-1 ring-inset ring-[oklch(var(--mono-yellow))] z-10"
          : "",
        isSelected ? "ring-2 ring-inset ring-primary z-20" : "",
        "hover:brightness-125",
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      onClick={onClick}
      title={square.name}
      aria-label={square.name}
      data-ocid={`board-square-${square.index}`}
    >
      {/* Color stripe */}
      {colorHex && (
        <div
          className="absolute z-10 pointer-events-none"
          style={stripeStyle}
        />
      )}

      {/* Owner overlay */}
      {ownerColor && (
        <div
          className="absolute inset-0 z-0 opacity-15 pointer-events-none"
          style={{ background: ownerColor.hex }}
        />
      )}

      {/* Owner border indicator */}
      {ownerColor && (
        <div
          className="absolute inset-0 z-10 border-2 pointer-events-none rounded-sm opacity-70"
          style={{ borderColor: ownerColor.hex }}
        />
      )}

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center gap-0.5 w-full h-full px-0.5">
        {isCorner ? (
          <>
            <span className="text-[7px] font-display font-black text-[oklch(var(--mono-yellow))] leading-none">
              {shortName()}
            </span>
          </>
        ) : (
          <>
            {icon && (
              <span className="text-[7px] leading-none opacity-70">{icon}</span>
            )}
            <span
              className="text-[4.5px] leading-tight text-center text-[oklch(0.7_0_0)] font-mono font-medium"
              style={{ wordBreak: "break-word", lineBreak: "anywhere" }}
            >
              {shortName()}
            </span>
            {square.price && (
              <span className="text-[4px] text-[oklch(0.55_0_0)] font-mono leading-none">
                ${square.price}
              </span>
            )}
          </>
        )}

        {/* Player tokens */}
        {playersHere.length > 0 && (
          <div className="flex flex-wrap gap-0.5 justify-center mt-0.5">
            {playersHere.map((p) => (
              <PlayerToken
                key={p.id.toText()}
                playerIndex={allPlayers.indexOf(p)}
                size="xs"
              />
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
