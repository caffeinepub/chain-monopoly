import { cn } from "../../lib/utils";
import { PLAYER_COLORS } from "./MonopolyBoard";

type TokenSize = "xs" | "sm" | "md" | "lg";

interface PlayerTokenProps {
  playerIndex: number;
  size?: TokenSize;
  isActive?: boolean;
  isMe?: boolean;
  className?: string;
}

const SIZE_CLASSES: Record<TokenSize, string> = {
  xs: "w-2 h-2 text-[5px]",
  sm: "w-3 h-3 text-[6px]",
  md: "w-4 h-4 text-[8px]",
  lg: "w-6 h-6 text-xs",
};

const SHAPES = ["◆", "●", "▲", "■"];

export default function PlayerToken({
  playerIndex,
  size = "sm",
  isActive = false,
  isMe = false,
  className,
}: PlayerTokenProps) {
  const color = PLAYER_COLORS[playerIndex];
  if (!color) return null;

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center shrink-0 border border-black/40",
        SIZE_CLASSES[size],
        color.bg,
        isActive && "ring-2 ring-white ring-offset-1 ring-offset-black/50",
        isMe && "ring-1 ring-white",
        className,
      )}
      title={`Player ${playerIndex + 1} (${color.label})`}
      aria-label={`Player ${playerIndex + 1}`}
    >
      <span className="text-black/60 font-bold leading-none select-none">
        {SHAPES[playerIndex] ?? "●"}
      </span>
    </div>
  );
}
