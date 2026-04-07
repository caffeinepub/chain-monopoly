import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Bitcoin, Coins, Dices, Plus, Users, Wallet } from "lucide-react";
import { useState } from "react";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { STAKE_PRESETS } from "../constants/board";
import { useAuth } from "../hooks/useAuth";
import { useBackend } from "../hooks/useBackend";
import { useWalletBalance } from "../hooks/useWalletBalance";
import { Currency, GamePhase } from "../types/game";
import type { CreateGameArgs, GameView } from "../types/game";

export default function LobbyPage() {
  const { isAuthenticated, login, isLoading: authLoading } = useAuth();
  const backend = useBackend();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { icp, ckbtc, loading: balanceLoading } = useWalletBalance();

  const [showCreate, setShowCreate] = useState(false);
  const [stake, setStake] = useState(50);
  const [currency, setCurrency] = useState<Currency>(Currency.ICP);

  const {
    data: games,
    isLoading,
    error,
  } = useQuery<GameView[]>({
    queryKey: ["open-games"],
    queryFn: () => backend.listOpenGames(),
    enabled: backend.isReady,
    refetchInterval: 3000,
  });

  const createMutation = useMutation({
    mutationFn: (args: CreateGameArgs) => backend.createGame(args),
    onSuccess: (game) => {
      queryClient.invalidateQueries({ queryKey: ["open-games"] });
      void navigate({ to: "/game/$gameId", params: { gameId: game.id } });
    },
  });

  const joinMutation = useMutation({
    mutationFn: (gameId: string) => backend.joinGame(gameId),
    onSuccess: (result, gameId) => {
      if (result.__kind__ === "Ok") {
        queryClient.invalidateQueries({ queryKey: ["open-games"] });
        void navigate({ to: "/game/$gameId", params: { gameId } });
      }
    },
  });

  const handleCreate = () => {
    createMutation.mutate({ stakeAmount: BigInt(stake), currency });
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Hero */}
      <section className="bg-card border-b border-border py-14 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-4">
            <span className="text-5xl" aria-hidden="true">
              ⬡
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-foreground mb-3">
            Chain Monopoly
          </h1>
          <p className="text-muted-foreground text-lg font-body mb-8 max-w-lg mx-auto">
            Classic Monopoly. Real money. On-chain escrow. 40 squares, 2–4
            players, one winner takes all.
          </p>
          {!isAuthenticated ? (
            <Button
              variant="gold"
              size="lg"
              onClick={login}
              loading={authLoading}
              data-ocid="hero-login-btn"
            >
              <Coins className="w-5 h-5" />
              Connect with Internet Identity
            </Button>
          ) : (
            <div className="space-y-4">
              {/* Wallet balances */}
              <div
                className="inline-flex items-center gap-5 bg-card/60 border border-border rounded-lg px-5 py-3 font-mono text-sm"
                data-ocid="wallet-balance-lobby"
              >
                <Wallet className="w-4 h-4 text-muted-foreground shrink-0" />
                {balanceLoading ? (
                  <span className="text-muted-foreground animate-pulse text-xs">
                    Loading balances…
                  </span>
                ) : (
                  <>
                    <span className="flex items-center gap-1.5">
                      <Coins className="w-3.5 h-3.5 text-[oklch(var(--mono-yellow))]" />
                      <span className="text-foreground font-semibold">
                        {icp.toString()}
                      </span>
                      <span className="text-muted-foreground">ICP</span>
                    </span>
                    <span className="text-border">|</span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-[oklch(var(--mono-orange))] inline-flex items-center justify-center text-[8px] font-bold text-background leading-none shrink-0">
                        ₿
                      </span>
                      <span className="text-foreground font-semibold">
                        {ckbtc.toString()}
                      </span>
                      <span className="text-muted-foreground">ckBTC</span>
                    </span>
                  </>
                )}
              </div>
              <div>
                <Button
                  variant="gold"
                  size="lg"
                  onClick={() => setShowCreate(true)}
                  data-ocid="create-game-btn"
                >
                  <Plus className="w-5 h-5" />
                  Create New Game
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Create Game Panel */}
      {showCreate && isAuthenticated && (
        <section className="bg-muted/40 border-b border-border py-6 px-4">
          <div className="max-w-lg mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>New Game Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {createMutation.error && (
                  <ErrorMessage message="Failed to create game. Please try again." />
                )}
                {/* Currency */}
                <div>
                  <p className="block text-sm font-display font-semibold mb-2 text-foreground">
                    Currency
                  </p>
                  <div className="flex gap-2" aria-label="Select currency">
                    {[Currency.ICP, Currency.ckBTC].map((c) => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setCurrency(c)}
                        data-ocid={`currency-${c}`}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded border text-sm font-semibold transition-smooth ${
                          currency === c
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-card text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        {c === Currency.ICP ? (
                          <Coins className="w-4 h-4" />
                        ) : (
                          <Bitcoin className="w-4 h-4" />
                        )}
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stake */}
                <div>
                  <p className="block text-sm font-display font-semibold mb-2 text-foreground">
                    Stake Amount ({currency})
                  </p>
                  <div
                    className="grid grid-cols-3 gap-2"
                    aria-label="Select stake amount"
                  >
                    {STAKE_PRESETS.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setStake(s)}
                        data-ocid={`stake-${s}`}
                        className={`py-2 rounded border text-sm font-semibold transition-smooth ${
                          stake === s
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-card text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={handleCreate}
                    loading={createMutation.isPending}
                    data-ocid="confirm-create-btn"
                  >
                    <Dices className="w-4 h-4" />
                    Create Game
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setShowCreate(false)}
                    data-ocid="cancel-create-btn"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Open Games List */}
      <section className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-xl mb-5 text-foreground">
            Open Games
          </h2>

          {isLoading && (
            <div className="flex justify-center py-12">
              <LoadingSpinner label="Fetching open games…" />
            </div>
          )}

          {error && (
            <ErrorMessage message="Could not load open games. Check your connection." />
          )}

          {!isLoading && !error && (!games || games.length === 0) && (
            <div
              className="text-center py-16 text-muted-foreground"
              data-ocid="empty-games-state"
            >
              <Dices className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-display font-semibold text-lg mb-1">
                No open games yet
              </p>
              <p className="text-sm font-body">
                Be the first to create one and invite friends.
              </p>
            </div>
          )}

          {games && games.length > 0 && (
            <div className="space-y-3">
              {games.map((game) => (
                <GameRow
                  key={game.id}
                  game={game}
                  isAuthenticated={isAuthenticated}
                  isJoining={joinMutation.isPending}
                  onJoin={() => joinMutation.mutate(game.id)}
                  onView={() =>
                    void navigate({
                      to: "/game/$gameId",
                      params: { gameId: game.id },
                    })
                  }
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

interface GameRowProps {
  game: GameView;
  isAuthenticated: boolean;
  isJoining: boolean;
  onJoin: () => void;
  onView: () => void;
}

function GameRow({
  game,
  isAuthenticated,
  isJoining,
  onJoin,
  onView,
}: GameRowProps) {
  const playerCount = game.players.length;
  const isLobby = game.phase === GamePhase.Lobby;

  return (
    <button
      type="button"
      className="w-full bg-card border border-border rounded-lg px-4 py-3 flex items-center justify-between gap-4 hover:border-primary/40 transition-smooth cursor-pointer text-left"
      onClick={onView}
      data-ocid="game-row"
    >
      <div className="flex items-center gap-3 min-w-0">
        <Dices className="w-5 h-5 text-primary shrink-0" />
        <div className="min-w-0">
          <p className="font-display font-semibold text-sm text-foreground truncate">
            Game #{game.id.slice(0, 8)}
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            Stake: {game.stakeAmount.toString()} {game.currency}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users className="w-3.5 h-3.5" />
          {playerCount}/4
        </span>
        <Badge variant={isLobby ? "success" : "muted"}>{game.phase}</Badge>
        {isLobby && isAuthenticated && playerCount < 4 && (
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onJoin();
            }}
            loading={isJoining}
            data-ocid="join-game-btn"
          >
            Join
          </Button>
        )}
      </div>
    </button>
  );
}
