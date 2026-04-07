import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface DiceRollerProps {
  isMyTurn: boolean;
  isRolling: boolean;
  lastResult: { die1: number; die2: number } | null;
  onRoll: () => void;
}

// Dot layout for each face: [row(0-2), col(0-2)]
const DOT_POSITIONS: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [
    [0, 0],
    [2, 2],
  ],
  3: [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  4: [
    [0, 0],
    [0, 2],
    [2, 0],
    [2, 2],
  ],
  5: [
    [0, 0],
    [0, 2],
    [1, 1],
    [2, 0],
    [2, 2],
  ],
  6: [
    [0, 0],
    [0, 2],
    [1, 0],
    [1, 2],
    [2, 0],
    [2, 2],
  ],
};

function DieFace({ value, animating }: { value: number; animating: boolean }) {
  const dots = DOT_POSITIONS[value] ?? DOT_POSITIONS[1];
  // Build a 3x3 grid of cells, mark which ones have dots
  const dotSet = new Set(dots.map(([r, c]) => `${r}-${c}`));

  return (
    <div
      className={`relative w-14 h-14 rounded-lg border-2 border-border bg-card flex items-center justify-center transition-all duration-75 ${
        animating ? "scale-105 border-primary/60" : "scale-100"
      }`}
      aria-label={`Die showing ${value}`}
      data-ocid="die-face"
    >
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: "repeat(3, 10px)",
          gridTemplateRows: "repeat(3, 10px)",
        }}
      >
        {["0-0", "0-1", "0-2", "1-0", "1-1", "1-2", "2-0", "2-1", "2-2"].map(
          (key) => (
            <div
              key={key}
              className="flex items-center justify-center w-[10px] h-[10px]"
            >
              {dotSet.has(key) && (
                <div className="w-2 h-2 rounded-full bg-foreground" />
              )}
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export function DiceRoller({
  isMyTurn,
  isRolling,
  lastResult,
  onRoll,
}: DiceRollerProps) {
  const [animDice, setAnimDice] = useState<{ d1: number; d2: number }>({
    d1: 1,
    d2: 1,
  });
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (!isRolling) return;
    setAnimating(true);
    let frame = 0;
    const interval = setInterval(() => {
      setAnimDice({
        d1: Math.floor(Math.random() * 6) + 1,
        d2: Math.floor(Math.random() * 6) + 1,
      });
      frame++;
      if (frame > 12) {
        clearInterval(interval);
        setAnimating(false);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [isRolling]);

  const displayDie1 = animating ? animDice.d1 : (lastResult?.die1 ?? 1);
  const displayDie2 = animating ? animDice.d2 : (lastResult?.die2 ?? 1);

  return (
    <div className="flex flex-col items-center gap-3" data-ocid="dice-roller">
      <div className="flex items-center gap-3">
        <DieFace value={displayDie1} animating={animating} />
        <span className="text-muted-foreground font-display font-bold text-lg">
          +
        </span>
        <DieFace value={displayDie2} animating={animating} />
      </div>

      {lastResult && !animating && (
        <p
          className="text-xs font-mono text-center"
          data-ocid="dice-result-label"
        >
          <span className="text-[oklch(var(--mono-yellow))] font-bold">
            {lastResult.die1} + {lastResult.die2} ={" "}
            {lastResult.die1 + lastResult.die2}
          </span>
        </p>
      )}

      <div
        title={!isMyTurn ? "Wait for your turn" : undefined}
        className="w-full"
      >
        <Button
          variant="gold"
          size="lg"
          className="w-full font-display font-bold tracking-wide"
          onClick={onRoll}
          disabled={!isMyTurn || isRolling}
          loading={isRolling}
          data-ocid="roll-dice-btn"
          aria-label={isMyTurn ? "Roll dice" : "Not your turn — wait"}
        >
          {isRolling ? "Rolling…" : "Roll Dice"}
        </Button>
      </div>

      {!isMyTurn && (
        <p className="text-xs text-muted-foreground text-center font-body">
          Waiting for your turn…
        </p>
      )}
    </div>
  );
}
