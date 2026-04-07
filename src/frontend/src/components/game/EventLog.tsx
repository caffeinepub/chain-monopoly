import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";
import { BOARD_SQUARES } from "../../constants/board";
import type { GameEvent } from "../../types/game";

interface EventLogProps {
  events: GameEvent[];
  myId: string | undefined;
}

function formatEventLabel(event: GameEvent): string {
  const kind = event.kind;
  if (kind.__kind__ === "Rolled") {
    const total = Number(kind.Rolled.die1) + Number(kind.Rolled.die2);
    return `rolled ${kind.Rolled.die1}+${kind.Rolled.die2} = ${total}`;
  }
  if (kind.__kind__ === "Moved") {
    const sq = BOARD_SQUARES[Number(kind.Moved.to)];
    return `moved to ${sq?.name ?? `space ${kind.Moved.to}`}`;
  }
  if (kind.__kind__ === "PropertyBought") {
    const sq = BOARD_SQUARES[Number(kind.PropertyBought.square)];
    return `bought ${sq?.name ?? "property"} for $${kind.PropertyBought.price}`;
  }
  if (kind.__kind__ === "RentPaid") {
    return `paid $${kind.RentPaid.amount} rent`;
  }
  if (kind.__kind__ === "TaxPaid") {
    return `paid $${kind.TaxPaid.amount} tax`;
  }
  if (kind.__kind__ === "SentToJail") {
    return "sent to Jail";
  }
  if (kind.__kind__ === "Bankrupt") {
    return "went bankrupt";
  }
  if (kind.__kind__ === "GameWon") {
    return "won the game 🏆";
  }
  if (kind.__kind__ === "PlayerJoined") {
    return "joined the game";
  }
  if (kind.__kind__ === "GameStarted") {
    return "game started";
  }
  return (kind as { __kind__: string }).__kind__;
}

function eventColor(kind: GameEvent["kind"]): string {
  if (kind.__kind__ === "GameWon") return "text-[oklch(var(--mono-yellow))]";
  if (kind.__kind__ === "Bankrupt") return "text-destructive";
  if (kind.__kind__ === "SentToJail") return "text-[oklch(var(--mono-orange))]";
  if (kind.__kind__ === "PropertyBought")
    return "text-[oklch(var(--mono-green))]";
  if (kind.__kind__ === "RentPaid" || kind.__kind__ === "TaxPaid")
    return "text-[oklch(var(--mono-red))]";
  if (kind.__kind__ === "Rolled") return "text-muted-foreground";
  return "text-foreground";
}

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function EventLog({ events, myId }: EventLogProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  const eventsLen = events.length;
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on new events
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [eventsLen]);

  return (
    <div className="flex flex-col h-full" data-ocid="event-log">
      <div className="px-4 py-2 border-b border-border shrink-0">
        <p className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">
          Event Log
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-3 py-2 space-y-1">
          {events.length === 0 && (
            <p
              className="text-xs text-muted-foreground py-3 text-center font-body"
              data-ocid="event-log-empty"
            >
              No events yet — game starts when all players are ready.
            </p>
          )}
          {events.map((ev, idx) => {
            const playerId = ev.player.toText();
            const isMe = playerId === myId;
            const shortId = isMe ? "You" : `${playerId.slice(0, 6)}…`;
            const label = formatEventLabel(ev);
            const color = eventColor(ev.kind);
            const ts = formatTimestamp(ev.timestamp);

            return (
              <div
                key={`${ev.timestamp.toString()}-${idx}`}
                className="flex items-start gap-2 py-0.5 group"
                data-ocid="event-log-entry"
              >
                <span
                  className={`font-mono text-[10px] shrink-0 mt-0.5 ${isMe ? "text-[oklch(var(--mono-yellow))]" : "text-muted-foreground"}`}
                >
                  {shortId}
                </span>
                <span className={`text-xs font-body flex-1 ${color}`}>
                  {label}
                </span>
                {ts && (
                  <span className="font-mono text-[9px] text-muted-foreground/50 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    {ts}
                  </span>
                )}
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>
    </div>
  );
}
