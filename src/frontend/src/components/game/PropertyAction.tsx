import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag, X } from "lucide-react";
import { COLOR_GROUP_HEX } from "../../constants/board";
import type { BoardSquare } from "../../types/game";

interface PropertyActionProps {
  square: BoardSquare;
  playerCash: bigint;
  isBuying: boolean;
  onBuy: () => void;
  onPass: () => void;
}

export function PropertyAction({
  square,
  playerCash,
  isBuying,
  onBuy,
  onPass,
}: PropertyActionProps) {
  const price = square.price ?? 0;
  const canAfford = Number(playerCash) >= price;
  const colorHex = square.colorGroup
    ? COLOR_GROUP_HEX[square.colorGroup]
    : null;

  return (
    <div
      className="rounded-lg border border-border bg-card p-3 space-y-3"
      data-ocid="property-action"
    >
      {/* Property header */}
      <div className="flex items-start gap-2">
        {colorHex && (
          <div
            className="w-3 h-full min-h-[2.5rem] rounded-sm shrink-0"
            style={{ background: colorHex }}
            aria-hidden="true"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-display font-bold text-sm text-foreground leading-tight">
              {square.name}
            </p>
            <Badge
              variant={square.kind === "railroad" ? "outline" : "muted"}
              className="text-[10px]"
            >
              {square.kind}
            </Badge>
          </div>
          <p className="font-mono text-xs text-muted-foreground mt-0.5">
            Unowned — available to purchase
          </p>
        </div>
      </div>

      {/* Price row */}
      <div className="flex items-center justify-between bg-muted/40 rounded px-3 py-2">
        <span className="text-xs text-muted-foreground font-body">Price</span>
        <span className="font-mono font-bold text-sm text-foreground">
          ${price.toLocaleString()}
        </span>
      </div>

      {/* Cash row */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs text-muted-foreground font-body">
          Your cash
        </span>
        <span
          className={`font-mono text-xs font-semibold ${canAfford ? "text-[oklch(var(--mono-green))]" : "text-destructive"}`}
        >
          ${Number(playerCash).toLocaleString()}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="gold"
          className="flex-1 font-display font-bold text-sm"
          onClick={onBuy}
          disabled={!canAfford || isBuying}
          loading={isBuying}
          data-ocid="buy-property-btn"
          aria-label={`Buy ${square.name} for $${price}`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          Buy — ${price.toLocaleString()}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onPass}
          disabled={isBuying}
          data-ocid="pass-property-btn"
          aria-label="Pass on this property"
          title="Pass"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {!canAfford && (
        <p className="text-xs text-destructive font-body text-center">
          Not enough cash to buy this property.
        </p>
      )}
    </div>
  );
}
