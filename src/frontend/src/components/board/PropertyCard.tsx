import { X } from "lucide-react";
import { COLOR_GROUP_HEX } from "../../constants/board";
import type { BoardSquare } from "../../types/game";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface PropertyCardProps {
  square: BoardSquare;
  ownerIdx: number;
  canBuy: boolean;
  onBuy?: () => void;
  isBuying?: boolean;
  onClose: () => void;
}

const GROUP_LABELS: Record<string, string> = {
  brown: "Brown",
  "light-blue": "Light Blue",
  pink: "Pink / Magenta",
  orange: "Orange",
  red: "Red",
  yellow: "Yellow",
  green: "Green",
  "dark-blue": "Dark Blue",
};

const KIND_ICONS: Record<string, string> = {
  railroad: "🚂",
  utility: "⚡",
  chance: "?",
  "community-chest": "♥",
  tax: "$",
  go: "→",
  jail: "⚖",
  "free-parking": "P",
  "go-to-jail": "✖",
};

const RENT_LABELS = [
  "Base Rent",
  "Monopoly",
  "1 House",
  "2 Houses",
  "3 Houses",
  "Hotel",
];

const RAILROAD_LABELS = [
  "1 Railroad",
  "2 Railroads",
  "3 Railroads",
  "4 Railroads",
];

export function PropertyCard({
  square,
  ownerIdx,
  canBuy,
  onBuy,
  isBuying,
  onClose,
}: PropertyCardProps) {
  const colorHex = square.colorGroup
    ? COLOR_GROUP_HEX[square.colorGroup]
    : null;
  const isProperty = square.kind === "property";
  const isRailroad = square.kind === "railroad";
  const isUtility = square.kind === "utility";
  const isPurchasable = isProperty || isRailroad || isUtility;
  const icon = KIND_ICONS[square.kind];
  const groupLabel = square.colorGroup ? GROUP_LABELS[square.colorGroup] : null;
  const rentLabels = isRailroad ? RAILROAD_LABELS : RENT_LABELS;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
      data-ocid="property-card-overlay"
    >
      <div
        className="pointer-events-auto w-64 rounded-xl border border-border bg-popover shadow-2xl overflow-hidden"
        data-ocid="property-card"
      >
        {/* Color header */}
        <div
          className="relative px-4 py-3 flex items-start justify-between"
          style={
            colorHex
              ? { background: colorHex }
              : { background: "oklch(0.2 0 0)" }
          }
        >
          <div className="min-w-0">
            <p className="font-display font-black text-sm text-black/80 leading-tight truncate">
              {square.name}
            </p>
            {groupLabel && (
              <p className="text-[10px] text-black/60 font-mono mt-0.5">
                {groupLabel}
              </p>
            )}
            {!colorHex && icon && <span className="text-xl">{icon}</span>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 ml-2 rounded p-0.5 bg-black/20 hover:bg-black/40 transition-colors"
            aria-label="Close"
            data-ocid="property-card-close"
          >
            <X className="w-3 h-3 text-black/70" />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-3 space-y-3">
          {/* Price */}
          {square.price !== null && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-body">
                {isPurchasable ? "Purchase Price" : "Amount"}
              </span>
              <span className="font-mono font-bold text-sm text-foreground">
                ${square.price.toLocaleString()}
              </span>
            </div>
          )}

          {/* Owner status */}
          {ownerIdx >= 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="muted" className="text-xs">
                Owned by Player {ownerIdx + 1}
              </Badge>
            </div>
          )}

          {/* Rent table */}
          {square.rent.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-[10px] font-display font-semibold text-muted-foreground uppercase tracking-wider">
                Rent
              </p>
              <div className="space-y-1">
                {square.rent.map((amount, i) => (
                  <div
                    key={rentLabels[i] ?? i}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-muted-foreground font-body">
                      {rentLabels[i] ?? `Level ${i}`}
                    </span>
                    <span className="font-mono text-foreground">
                      ${amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Special square info */}
          {square.kind === "tax" && (
            <p className="text-xs text-muted-foreground font-body">
              Pay ${square.index === 4 ? "200" : "100"} or 10% of assets.
            </p>
          )}
          {square.kind === "chance" && (
            <p className="text-xs text-muted-foreground font-body">
              Draw a Chance card.
            </p>
          )}
          {square.kind === "community-chest" && (
            <p className="text-xs text-muted-foreground font-body">
              Draw a Community Chest card.
            </p>
          )}
          {square.kind === "go" && (
            <p className="text-xs text-muted-foreground font-body">
              Collect $200 salary as you pass GO.
            </p>
          )}
          {square.kind === "free-parking" && (
            <p className="text-xs text-muted-foreground font-body">
              Free rest stop — no penalty.
            </p>
          )}
          {square.kind === "jail" && (
            <p className="text-xs text-muted-foreground font-body">
              Just visiting, or serving time.
            </p>
          )}
          {square.kind === "go-to-jail" && (
            <p className="text-xs text-muted-foreground font-body">
              Go directly to Jail. Do not pass GO.
            </p>
          )}
        </div>

        {/* Buy actions */}
        {canBuy && (
          <div className="px-4 pb-4 flex gap-2">
            <Button
              variant="gold"
              size="sm"
              className="flex-1"
              onClick={onBuy}
              loading={isBuying}
              data-ocid="buy-property-card-btn"
            >
              Buy ${square.price?.toLocaleString()}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              data-ocid="pass-property-btn"
            >
              Pass
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
