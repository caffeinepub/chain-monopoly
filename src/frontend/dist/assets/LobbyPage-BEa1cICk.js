import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, u as useAuth, b as useNavigate, d as useQueryClient, e as useWalletBalance, r as reactExports, B as Button, C as Coins, L as LoadingSpinner } from "./index-Dybke6OT.js";
import { u as useBackend, C as Currency, a as useQuery, b as useMutation, E as ErrorMessage, S as STAKE_PRESETS, G as GamePhase, B as Badge } from "./useBackend-izZcTq11.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727",
      key: "yr8idg"
    }
  ]
];
const Bitcoin = createLucideIcon("bitcoin", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "12", height: "12", x: "2", y: "10", rx: "2", ry: "2", key: "6agr2n" }],
  [
    "path",
    { d: "m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6", key: "1o487t" }
  ],
  ["path", { d: "M6 18h.01", key: "uhywen" }],
  ["path", { d: "M10 14h.01", key: "ssrbsk" }],
  ["path", { d: "M15 6h.01", key: "cblpky" }],
  ["path", { d: "M18 9h.01", key: "2061c0" }]
];
const Dices = createLucideIcon("dices", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode);
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function LobbyPage() {
  const { isAuthenticated, login, isLoading: authLoading } = useAuth();
  const backend = useBackend();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { icp, ckbtc, loading: balanceLoading } = useWalletBalance();
  const [showCreate, setShowCreate] = reactExports.useState(false);
  const [stake, setStake] = reactExports.useState(50);
  const [currency, setCurrency] = reactExports.useState(Currency.ICP);
  const {
    data: games,
    isLoading,
    error
  } = useQuery({
    queryKey: ["open-games"],
    queryFn: () => backend.listOpenGames(),
    enabled: backend.isReady,
    refetchInterval: 3e3
  });
  const createMutation = useMutation({
    mutationFn: (args) => backend.createGame(args),
    onSuccess: (game) => {
      queryClient.invalidateQueries({ queryKey: ["open-games"] });
      void navigate({ to: "/game/$gameId", params: { gameId: game.id } });
    }
  });
  const joinMutation = useMutation({
    mutationFn: (gameId) => backend.joinGame(gameId),
    onSuccess: (result, gameId) => {
      if (result.__kind__ === "Ok") {
        queryClient.invalidateQueries({ queryKey: ["open-games"] });
        void navigate({ to: "/game/$gameId", params: { gameId } });
      }
    }
  });
  const handleCreate = () => {
    createMutation.mutate({ stakeAmount: BigInt(stake), currency });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-14 px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", "aria-hidden": "true", children: "⬡" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl sm:text-5xl font-black tracking-tight text-foreground mb-3", children: "Chain Monopoly" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg font-body mb-8 max-w-lg mx-auto", children: "Classic Monopoly. Real money. On-chain escrow. 40 squares, 2–4 players, one winner takes all." }),
      !isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "gold",
          size: "lg",
          onClick: login,
          loading: authLoading,
          "data-ocid": "hero-login-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-5 h-5" }),
            "Connect with Internet Identity"
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "inline-flex items-center gap-5 bg-card/60 border border-border rounded-lg px-5 py-3 font-mono text-sm",
            "data-ocid": "wallet-balance-lobby",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
              balanceLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground animate-pulse text-xs", children: "Loading balances…" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-3.5 h-3.5 text-[oklch(var(--mono-yellow))]" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: icp.toString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "ICP" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "|" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 rounded-full bg-[oklch(var(--mono-orange))] inline-flex items-center justify-center text-[8px] font-bold text-background leading-none shrink-0", children: "₿" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: ckbtc.toString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "ckBTC" })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "gold",
            size: "lg",
            onClick: () => setShowCreate(true),
            "data-ocid": "create-game-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-5 h-5" }),
              "Create New Game"
            ]
          }
        ) })
      ] })
    ] }) }),
    showCreate && isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 border-b border-border py-6 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-lg mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "New Game Settings" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
        createMutation.error && /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { message: "Failed to create game. Please try again." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-sm font-display font-semibold mb-2 text-foreground", children: "Currency" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", "aria-label": "Select currency", children: [Currency.ICP, Currency.ckBTC].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setCurrency(c),
              "data-ocid": `currency-${c}`,
              className: `flex-1 flex items-center justify-center gap-2 py-2.5 rounded border text-sm font-semibold transition-smooth ${currency === c ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/50"}`,
              children: [
                c === Currency.ICP ? /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bitcoin, { className: "w-4 h-4" }),
                c
              ]
            },
            c
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "block text-sm font-display font-semibold mb-2 text-foreground", children: [
            "Stake Amount (",
            currency,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-3 gap-2",
              "aria-label": "Select stake amount",
              children: STAKE_PRESETS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setStake(s),
                  "data-ocid": `stake-${s}`,
                  className: `py-2 rounded border text-sm font-semibold transition-smooth ${stake === s ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/50"}`,
                  children: s
                },
                s
              ))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "primary",
              className: "flex-1",
              onClick: handleCreate,
              loading: createMutation.isPending,
              "data-ocid": "confirm-create-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Dices, { className: "w-4 h-4" }),
                "Create Game"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "secondary",
              onClick: () => setShowCreate(false),
              "data-ocid": "cancel-create-btn",
              children: "Cancel"
            }
          )
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "flex-1 py-8 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl mb-5 text-foreground", children: "Open Games" }),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { label: "Fetching open games…" }) }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { message: "Could not load open games. Check your connection." }),
      !isLoading && !error && (!games || games.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16 text-muted-foreground",
          "data-ocid": "empty-games-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Dices, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-lg mb-1", children: "No open games yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body", children: "Be the first to create one and invite friends." })
          ]
        }
      ),
      games && games.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: games.map((game) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        GameRow,
        {
          game,
          isAuthenticated,
          isJoining: joinMutation.isPending,
          onJoin: () => joinMutation.mutate(game.id),
          onView: () => void navigate({
            to: "/game/$gameId",
            params: { gameId: game.id }
          })
        },
        game.id
      )) })
    ] }) })
  ] });
}
function GameRow({
  game,
  isAuthenticated,
  isJoining,
  onJoin,
  onView
}) {
  const playerCount = game.players.length;
  const isLobby = game.phase === GamePhase.Lobby;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: "w-full bg-card border border-border rounded-lg px-4 py-3 flex items-center justify-between gap-4 hover:border-primary/40 transition-smooth cursor-pointer text-left",
      onClick: onView,
      "data-ocid": "game-row",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Dices, { className: "w-5 h-5 text-primary shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-semibold text-sm text-foreground truncate", children: [
              "Game #",
              game.id.slice(0, 8)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
              "Stake: ",
              game.stakeAmount.toString(),
              " ",
              game.currency
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
            playerCount,
            "/4"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: isLobby ? "success" : "muted", children: game.phase }),
          isLobby && isAuthenticated && playerCount < 4 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "primary",
              size: "sm",
              onClick: (e) => {
                e.stopPropagation();
                onJoin();
              },
              loading: isJoining,
              "data-ocid": "join-game-btn",
              children: "Join"
            }
          )
        ] })
      ]
    }
  );
}
export {
  LobbyPage as default
};
