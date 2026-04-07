import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, B as Button, r as reactExports, f as composeRefs, g as useComposedRefs, h as useParams, u as useAuth, d as useQueryClient, L as LoadingSpinner } from "./index-Dybke6OT.js";
import { c as COLOR_GROUP_HEX, B as Badge, d as BOARD_SQUARES, G as GamePhase, u as useBackend, a as useQuery, b as useMutation, E as ErrorMessage } from "./useBackend-izZcTq11.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$5);
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
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57"
    }
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }]
];
const Crown = createLucideIcon("crown", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8", key: "15492f" }],
  ["path", { d: "m16 16 6-6", key: "vzrcl6" }],
  ["path", { d: "m8 8 6-6", key: "18bi4p" }],
  ["path", { d: "m9 7 8 8", key: "5jnvq1" }],
  ["path", { d: "m21 11-8-8", key: "z4y7zo" }]
];
const Gavel = createLucideIcon("gavel", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z", key: "hou9p0" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12.5 17-.5-1-.5 1h1z", key: "3me087" }],
  [
    "path",
    {
      d: "M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z",
      key: "1o5pge"
    }
  ],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }]
];
const Skull = createLucideIcon("skull", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
const SIZE_CLASSES = {
  xs: "w-2 h-2 text-[5px]",
  sm: "w-3 h-3 text-[6px]",
  md: "w-4 h-4 text-[8px]",
  lg: "w-6 h-6 text-xs"
};
const SHAPES = ["◆", "●", "▲", "■"];
function PlayerToken({
  playerIndex,
  size = "sm",
  isActive = false,
  isMe = false,
  className
}) {
  const color = PLAYER_COLORS[playerIndex];
  if (!color) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "rounded-full flex items-center justify-center shrink-0 border border-black/40",
        SIZE_CLASSES[size],
        color.bg,
        isActive && "ring-2 ring-white ring-offset-1 ring-offset-black/50",
        isMe && "ring-1 ring-white",
        className
      ),
      title: `Player ${playerIndex + 1} (${color.label})`,
      "aria-label": `Player ${playerIndex + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-black/60 font-bold leading-none select-none", children: SHAPES[playerIndex] ?? "●" })
    }
  );
}
const CORNER_INDICES = /* @__PURE__ */ new Set([0, 10, 20, 30]);
const ICONS = {
  go: "→",
  jail: "⚖",
  "free-parking": "P",
  "go-to-jail": "!",
  chance: "?",
  "community-chest": "♥",
  tax: "$",
  railroad: "🚂",
  utility: "⚡"
};
function BoardSquareCell({
  square,
  style,
  playersHere,
  allPlayers,
  ownerIdx,
  isMyPosition,
  isSelected,
  onClick
}) {
  const isCorner = CORNER_INDICES.has(square.index);
  const colorHex = square.colorGroup ? COLOR_GROUP_HEX[square.colorGroup] : null;
  const ownerColor = ownerIdx >= 0 ? PLAYER_COLORS[ownerIdx] : null;
  const icon = ICONS[square.kind];
  const getStripePos = () => {
    if (square.index <= 10) return "top";
    if (square.index <= 19) return "right";
    if (square.index <= 30) return "bottom";
    return "left";
  };
  const stripePos = getStripePos();
  const stripeStyle = {};
  if (colorHex) {
    if (stripePos === "top")
      Object.assign(stripeStyle, {
        top: 0,
        left: 0,
        right: 0,
        height: "22%",
        background: colorHex
      });
    if (stripePos === "bottom")
      Object.assign(stripeStyle, {
        bottom: 0,
        left: 0,
        right: 0,
        height: "22%",
        background: colorHex
      });
    if (stripePos === "left")
      Object.assign(stripeStyle, {
        left: 0,
        top: 0,
        bottom: 0,
        width: "22%",
        background: colorHex
      });
    if (stripePos === "right")
      Object.assign(stripeStyle, {
        right: 0,
        top: 0,
        bottom: 0,
        width: "22%",
        background: colorHex
      });
  }
  const shortName = () => {
    if (isCorner)
      return square.name.split(" ").map((w) => w[0]).join("");
    const parts = square.name.split(" ");
    if (parts.length === 1) return parts[0].slice(0, 5);
    return parts.map((w) => w.slice(0, 3)).join(" ");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: [
        "relative flex flex-col items-center justify-center overflow-hidden transition-all duration-150 cursor-pointer",
        "border border-[oklch(0.22_0_0)]",
        isCorner ? "bg-[oklch(0.17_0.02_270)]" : "bg-[oklch(0.14_0.005_180)]",
        isMyPosition ? "ring-1 ring-inset ring-[oklch(var(--mono-yellow))] z-10" : "",
        isSelected ? "ring-2 ring-inset ring-primary z-20" : "",
        "hover:brightness-125"
      ].filter(Boolean).join(" "),
      style,
      onClick,
      title: square.name,
      "aria-label": square.name,
      "data-ocid": `board-square-${square.index}`,
      children: [
        colorHex && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute z-10 pointer-events-none",
            style: stripeStyle
          }
        ),
        ownerColor && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 z-0 opacity-15 pointer-events-none",
            style: { background: ownerColor.hex }
          }
        ),
        ownerColor && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 z-10 border-2 pointer-events-none rounded-sm opacity-70",
            style: { borderColor: ownerColor.hex }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-20 flex flex-col items-center justify-center gap-0.5 w-full h-full px-0.5", children: [
          isCorner ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[7px] font-display font-black text-[oklch(var(--mono-yellow))] leading-none", children: shortName() }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[7px] leading-none opacity-70", children: icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[4.5px] leading-tight text-center text-[oklch(0.7_0_0)] font-mono font-medium",
                style: { wordBreak: "break-word", lineBreak: "anywhere" },
                children: shortName()
              }
            ),
            square.price && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[4px] text-[oklch(0.55_0_0)] font-mono leading-none", children: [
              "$",
              square.price
            ] })
          ] }),
          playersHere.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-0.5 justify-center mt-0.5", children: playersHere.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            PlayerToken,
            {
              playerIndex: allPlayers.indexOf(p),
              size: "xs"
            },
            p.id.toText()
          )) })
        ] })
      ]
    }
  );
}
const GROUP_LABELS = {
  brown: "Brown",
  "light-blue": "Light Blue",
  pink: "Pink / Magenta",
  orange: "Orange",
  red: "Red",
  yellow: "Yellow",
  green: "Green",
  "dark-blue": "Dark Blue"
};
const KIND_ICONS = {
  railroad: "🚂",
  utility: "⚡",
  chance: "?",
  "community-chest": "♥",
  tax: "$",
  go: "→",
  jail: "⚖",
  "free-parking": "P",
  "go-to-jail": "✖"
};
const RENT_LABELS = [
  "Base Rent",
  "Monopoly",
  "1 House",
  "2 Houses",
  "3 Houses",
  "Hotel"
];
const RAILROAD_LABELS = [
  "1 Railroad",
  "2 Railroads",
  "3 Railroads",
  "4 Railroads"
];
function PropertyCard({
  square,
  ownerIdx,
  canBuy,
  onBuy,
  isBuying,
  onClose
}) {
  var _a;
  const colorHex = square.colorGroup ? COLOR_GROUP_HEX[square.colorGroup] : null;
  const isProperty = square.kind === "property";
  const isRailroad = square.kind === "railroad";
  const isUtility = square.kind === "utility";
  const isPurchasable = isProperty || isRailroad || isUtility;
  const icon = KIND_ICONS[square.kind];
  const groupLabel = square.colorGroup ? GROUP_LABELS[square.colorGroup] : null;
  const rentLabels = isRailroad ? RAILROAD_LABELS : RENT_LABELS;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "absolute inset-0 flex items-center justify-center z-50 pointer-events-none",
      "data-ocid": "property-card-overlay",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "pointer-events-auto w-64 rounded-xl border border-border bg-popover shadow-2xl overflow-hidden",
          "data-ocid": "property-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative px-4 py-3 flex items-start justify-between",
                style: colorHex ? { background: colorHex } : { background: "oklch(0.2 0 0)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-sm text-black/80 leading-tight truncate", children: square.name }),
                    groupLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-black/60 font-mono mt-0.5", children: groupLabel }),
                    !colorHex && icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: icon })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      className: "shrink-0 ml-2 rounded p-0.5 bg-black/20 hover:bg-black/40 transition-colors",
                      "aria-label": "Close",
                      "data-ocid": "property-card-close",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3 text-black/70" })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 space-y-3", children: [
              square.price !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body", children: isPurchasable ? "Purchase Price" : "Amount" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold text-sm text-foreground", children: [
                  "$",
                  square.price.toLocaleString()
                ] })
              ] }),
              ownerIdx >= 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "muted", className: "text-xs", children: [
                "Owned by Player ",
                ownerIdx + 1
              ] }) }),
              square.rent.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-display font-semibold text-muted-foreground uppercase tracking-wider", children: "Rent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: square.rent.map((amount, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between text-xs",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-body", children: rentLabels[i] ?? `Level ${i}` }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-foreground", children: [
                        "$",
                        amount.toLocaleString()
                      ] })
                    ]
                  },
                  rentLabels[i] ?? i
                )) })
              ] }),
              square.kind === "tax" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body", children: [
                "Pay $",
                square.index === 4 ? "200" : "100",
                " or 10% of assets."
              ] }),
              square.kind === "chance" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Draw a Chance card." }),
              square.kind === "community-chest" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Draw a Community Chest card." }),
              square.kind === "go" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Collect $200 salary as you pass GO." }),
              square.kind === "free-parking" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Free rest stop — no penalty." }),
              square.kind === "jail" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Just visiting, or serving time." }),
              square.kind === "go-to-jail" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Go directly to Jail. Do not pass GO." })
            ] }),
            canBuy && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "gold",
                  size: "sm",
                  className: "flex-1",
                  onClick: onBuy,
                  loading: isBuying,
                  "data-ocid": "buy-property-card-btn",
                  children: [
                    "Buy $",
                    (_a = square.price) == null ? void 0 : _a.toLocaleString()
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: onClose,
                  "data-ocid": "pass-property-btn",
                  children: "Pass"
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
const PLAYER_COLORS = [
  {
    bg: "bg-[oklch(var(--mono-red))]",
    hex: "oklch(var(--mono-red))",
    ring: "ring-[oklch(var(--mono-red))]",
    label: "Red"
  },
  {
    bg: "bg-[oklch(var(--mono-light-blue))]",
    hex: "oklch(var(--mono-light-blue))",
    ring: "ring-[oklch(var(--mono-light-blue))]",
    label: "Blue"
  },
  {
    bg: "bg-[oklch(var(--mono-green))]",
    hex: "oklch(var(--mono-green))",
    ring: "ring-[oklch(var(--mono-green))]",
    label: "Green"
  },
  {
    bg: "bg-[oklch(var(--mono-yellow))]",
    hex: "oklch(var(--mono-yellow))",
    ring: "ring-[oklch(var(--mono-yellow))]",
    label: "Yellow"
  }
];
function MonopolyBoard({
  game,
  myId,
  onBuyProperty,
  isBuying
}) {
  const [selectedSquare, setSelectedSquare] = reactExports.useState(null);
  const positions = /* @__PURE__ */ new Map();
  for (const p of game.players) {
    const pos = Number(p.position);
    if (!positions.has(pos)) positions.set(pos, []);
    positions.get(pos).push(p);
  }
  const ownedMap = /* @__PURE__ */ new Map();
  for (const prop of game.properties) {
    const ownerIdx = game.players.findIndex(
      (p) => p.id.toText() === prop.owner.toText()
    );
    ownedMap.set(Number(prop.square), ownerIdx);
  }
  const me = game.players.find((p) => p.id.toText() === myId);
  const myPosition = me ? Number(me.position) : -1;
  const selectedSquareData = selectedSquare !== null ? BOARD_SQUARES[selectedSquare] : null;
  const isSelectedOwned = selectedSquare !== null ? ownedMap.has(selectedSquare) : false;
  const canBuySelected = selectedSquare !== null && selectedSquare === myPosition && !isSelectedOwned && selectedSquareData !== null && selectedSquareData.price !== null && (selectedSquareData.kind === "property" || selectedSquareData.kind === "railroad" || selectedSquareData.kind === "utility");
  const getGridStyle = (index) => {
    if (index === 0) return { gridColumn: "11", gridRow: "11" };
    if (index <= 9) return { gridColumn: `${11 - index}`, gridRow: "11" };
    if (index === 10) return { gridColumn: "1", gridRow: "11" };
    if (index <= 19)
      return { gridColumn: "1", gridRow: `${11 - (index - 10)}` };
    if (index === 20) return { gridColumn: "1", gridRow: "1" };
    if (index <= 29) return { gridColumn: `${index - 19}`, gridRow: "1" };
    if (index === 30) return { gridColumn: "11", gridRow: "1" };
    return { gridColumn: "11", gridRow: `${index - 29}` };
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative w-full max-w-[640px] aspect-square select-none",
      "data-ocid": "monopoly-board",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute inset-0 bg-[oklch(0.13_0.01_180)] rounded-xl border border-border overflow-hidden",
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(11, 1fr)",
              gridTemplateRows: "repeat(11, 1fr)"
            },
            children: [
              BOARD_SQUARES.map((sq) => {
                const playersHere = positions.get(sq.index) ?? [];
                const ownerIdx = ownedMap.get(sq.index) ?? -1;
                const style = getGridStyle(sq.index);
                const isMyPosition = sq.index === myPosition;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  BoardSquareCell,
                  {
                    square: sq,
                    style,
                    playersHere,
                    allPlayers: game.players,
                    ownerIdx,
                    isMyPosition,
                    isSelected: selectedSquare === sq.index,
                    onClick: () => setSelectedSquare(selectedSquare === sq.index ? null : sq.index)
                  },
                  sq.index
                );
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex flex-col items-center justify-center text-center p-3 pointer-events-none",
                  style: { gridColumn: "2 / 11", gridRow: "2 / 11" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-[clamp(14px,3vw,28px)] text-[oklch(var(--mono-yellow))] leading-none tracking-tight", children: "CHAIN" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-[clamp(14px,3vw,28px)] text-foreground leading-none tracking-tight", children: "MONOPOLY" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex gap-1 justify-center flex-wrap", children: game.players.map((p, i) => {
                      var _a;
                      return /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `w-3 h-3 rounded-full border border-border/60 ${((_a = PLAYER_COLORS[i]) == null ? void 0 : _a.bg) ?? "bg-muted"}`,
                          title: p.id.toText().slice(0, 8)
                        },
                        p.id.toText()
                      );
                    }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-mono mt-1 opacity-60", children: "40 SPACES" })
                  ] })
                }
              )
            ]
          }
        ),
        selectedSquareData && /* @__PURE__ */ jsxRuntimeExports.jsx(
          PropertyCard,
          {
            square: selectedSquareData,
            ownerIdx: isSelectedOwned ? ownedMap.get(selectedSquare) ?? -1 : -1,
            canBuy: canBuySelected,
            onBuy: onBuyProperty,
            isBuying,
            onClose: () => setSelectedSquare(null)
          }
        )
      ]
    }
  );
}
const DOT_POSITIONS = {
  1: [[1, 1]],
  2: [
    [0, 0],
    [2, 2]
  ],
  3: [
    [0, 0],
    [1, 1],
    [2, 2]
  ],
  4: [
    [0, 0],
    [0, 2],
    [2, 0],
    [2, 2]
  ],
  5: [
    [0, 0],
    [0, 2],
    [1, 1],
    [2, 0],
    [2, 2]
  ],
  6: [
    [0, 0],
    [0, 2],
    [1, 0],
    [1, 2],
    [2, 0],
    [2, 2]
  ]
};
function DieFace({ value, animating }) {
  const dots = DOT_POSITIONS[value] ?? DOT_POSITIONS[1];
  const dotSet = new Set(dots.map(([r, c]) => `${r}-${c}`));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `relative w-14 h-14 rounded-lg border-2 border-border bg-card flex items-center justify-center transition-all duration-75 ${animating ? "scale-105 border-primary/60" : "scale-100"}`,
      "aria-label": `Die showing ${value}`,
      "data-ocid": "die-face",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid gap-1",
          style: {
            gridTemplateColumns: "repeat(3, 10px)",
            gridTemplateRows: "repeat(3, 10px)"
          },
          children: ["0-0", "0-1", "0-2", "1-0", "1-1", "1-2", "2-0", "2-1", "2-2"].map(
            (key) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex items-center justify-center w-[10px] h-[10px]",
                children: dotSet.has(key) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-foreground" })
              },
              key
            )
          )
        }
      )
    }
  );
}
function DiceRoller({
  isMyTurn,
  isRolling,
  lastResult,
  onRoll
}) {
  const [animDice, setAnimDice] = reactExports.useState({
    d1: 1,
    d2: 1
  });
  const [animating, setAnimating] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isRolling) return;
    setAnimating(true);
    let frame = 0;
    const interval = setInterval(() => {
      setAnimDice({
        d1: Math.floor(Math.random() * 6) + 1,
        d2: Math.floor(Math.random() * 6) + 1
      });
      frame++;
      if (frame > 12) {
        clearInterval(interval);
        setAnimating(false);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [isRolling]);
  const displayDie1 = animating ? animDice.d1 : (lastResult == null ? void 0 : lastResult.die1) ?? 1;
  const displayDie2 = animating ? animDice.d2 : (lastResult == null ? void 0 : lastResult.die2) ?? 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", "data-ocid": "dice-roller", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DieFace, { value: displayDie1, animating }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-display font-bold text-lg", children: "+" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DieFace, { value: displayDie2, animating })
    ] }),
    lastResult && !animating && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-xs font-mono text-center",
        "data-ocid": "dice-result-label",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[oklch(var(--mono-yellow))] font-bold", children: [
          lastResult.die1,
          " + ",
          lastResult.die2,
          " =",
          " ",
          lastResult.die1 + lastResult.die2
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        title: !isMyTurn ? "Wait for your turn" : void 0,
        className: "w-full",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "gold",
            size: "lg",
            className: "w-full font-display font-bold tracking-wide",
            onClick: onRoll,
            disabled: !isMyTurn || isRolling,
            loading: isRolling,
            "data-ocid": "roll-dice-btn",
            "aria-label": isMyTurn ? "Roll dice" : "Not your turn — wait",
            children: isRolling ? "Rolling…" : "Roll Dice"
          }
        )
      }
    ),
    !isMyTurn && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center font-body", children: "Waiting for your turn…" })
  ] });
}
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
          return reactExports.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (reactExports.isValidElement(children)) {
      const childrenRef = getElementRef$1(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== reactExports.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return reactExports.cloneElement(children, props2);
    }
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
function isSlottable(child) {
  return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef$1(element) {
  var _a, _b;
  let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = /* @__PURE__ */ createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var useLayoutEffect2 = (globalThis == null ? void 0 : globalThis.document) ? reactExports.useLayoutEffect : () => {
};
function useStateMachine$1(initialState, machine) {
  return reactExports.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var Presence = (props) => {
  const { present, children } = props;
  const presence = usePresence(present);
  const child = typeof children === "function" ? children({ present: presence.isPresent }) : reactExports.Children.only(children);
  const ref = useComposedRefs(presence.ref, getElementRef(child));
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? reactExports.cloneElement(child, { ref }) : null;
};
Presence.displayName = "Presence";
function usePresence(present) {
  const [node, setNode] = reactExports.useState();
  const stylesRef = reactExports.useRef(null);
  const prevPresentRef = reactExports.useRef(present);
  const prevAnimationNameRef = reactExports.useRef("none");
  const initialState = present ? "mounted" : "unmounted";
  const [state, send] = useStateMachine$1(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  reactExports.useEffect(() => {
    const currentAnimationName = getAnimationName(stylesRef.current);
    prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
  }, [state]);
  useLayoutEffect2(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName(styles);
      if (present) {
        send("MOUNT");
      } else if (currentAnimationName === "none" || (styles == null ? void 0 : styles.display) === "none") {
        send("UNMOUNT");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) {
          send("ANIMATION_OUT");
        } else {
          send("UNMOUNT");
        }
      }
      prevPresentRef.current = present;
    }
  }, [present, send]);
  useLayoutEffect2(() => {
    if (node) {
      let timeoutId;
      const ownerWindow = node.ownerDocument.defaultView ?? window;
      const handleAnimationEnd = (event) => {
        const currentAnimationName = getAnimationName(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
        if (event.target === node && isCurrentAnimation) {
          send("ANIMATION_END");
          if (!prevPresentRef.current) {
            const currentFillMode = node.style.animationFillMode;
            node.style.animationFillMode = "forwards";
            timeoutId = ownerWindow.setTimeout(() => {
              if (node.style.animationFillMode === "forwards") {
                node.style.animationFillMode = currentFillMode;
              }
            });
          }
        }
      };
      const handleAnimationStart = (event) => {
        if (event.target === node) {
          prevAnimationNameRef.current = getAnimationName(stylesRef.current);
        }
      };
      node.addEventListener("animationstart", handleAnimationStart);
      node.addEventListener("animationcancel", handleAnimationEnd);
      node.addEventListener("animationend", handleAnimationEnd);
      return () => {
        ownerWindow.clearTimeout(timeoutId);
        node.removeEventListener("animationstart", handleAnimationStart);
        node.removeEventListener("animationcancel", handleAnimationEnd);
        node.removeEventListener("animationend", handleAnimationEnd);
      };
    } else {
      send("ANIMATION_END");
    }
  }, [node, send]);
  return {
    isPresent: ["mounted", "unmountSuspended"].includes(state),
    ref: reactExports.useCallback((node2) => {
      stylesRef.current = node2 ? getComputedStyle(node2) : null;
      setNode(node2);
    }, [])
  };
}
function getAnimationName(styles) {
  return (styles == null ? void 0 : styles.animationName) || "none";
}
function getElementRef(element) {
  var _a, _b;
  let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
function useCallbackRef(callback) {
  const callbackRef = reactExports.useRef(callback);
  reactExports.useEffect(() => {
    callbackRef.current = callback;
  });
  return reactExports.useMemo(() => (...args) => {
    var _a;
    return (_a = callbackRef.current) == null ? void 0 : _a.call(callbackRef, ...args);
  }, []);
}
var DirectionContext = reactExports.createContext(void 0);
function useDirection(localDir) {
  const globalDir = reactExports.useContext(DirectionContext);
  return localDir || globalDir || "ltr";
}
function clamp(value, [min, max]) {
  return Math.min(max, Math.max(min, value));
}
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return function handleEvent(event) {
    originalEventHandler == null ? void 0 : originalEventHandler(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      return ourEventHandler == null ? void 0 : ourEventHandler(event);
    }
  };
}
function useStateMachine(initialState, machine) {
  return reactExports.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var SCROLL_AREA_NAME = "ScrollArea";
var [createScrollAreaContext] = createContextScope(SCROLL_AREA_NAME);
var [ScrollAreaProvider, useScrollAreaContext] = createScrollAreaContext(SCROLL_AREA_NAME);
var ScrollArea$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeScrollArea,
      type = "hover",
      dir,
      scrollHideDelay = 600,
      ...scrollAreaProps
    } = props;
    const [scrollArea, setScrollArea] = reactExports.useState(null);
    const [viewport, setViewport] = reactExports.useState(null);
    const [content, setContent] = reactExports.useState(null);
    const [scrollbarX, setScrollbarX] = reactExports.useState(null);
    const [scrollbarY, setScrollbarY] = reactExports.useState(null);
    const [cornerWidth, setCornerWidth] = reactExports.useState(0);
    const [cornerHeight, setCornerHeight] = reactExports.useState(0);
    const [scrollbarXEnabled, setScrollbarXEnabled] = reactExports.useState(false);
    const [scrollbarYEnabled, setScrollbarYEnabled] = reactExports.useState(false);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setScrollArea(node));
    const direction = useDirection(dir);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaProvider,
      {
        scope: __scopeScrollArea,
        type,
        dir: direction,
        scrollHideDelay,
        scrollArea,
        viewport,
        onViewportChange: setViewport,
        content,
        onContentChange: setContent,
        scrollbarX,
        onScrollbarXChange: setScrollbarX,
        scrollbarXEnabled,
        onScrollbarXEnabledChange: setScrollbarXEnabled,
        scrollbarY,
        onScrollbarYChange: setScrollbarY,
        scrollbarYEnabled,
        onScrollbarYEnabledChange: setScrollbarYEnabled,
        onCornerWidthChange: setCornerWidth,
        onCornerHeightChange: setCornerHeight,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            ...scrollAreaProps,
            ref: composedRefs,
            style: {
              position: "relative",
              // Pass corner sizes as CSS vars to reduce re-renders of context consumers
              ["--radix-scroll-area-corner-width"]: cornerWidth + "px",
              ["--radix-scroll-area-corner-height"]: cornerHeight + "px",
              ...props.style
            }
          }
        )
      }
    );
  }
);
ScrollArea$1.displayName = SCROLL_AREA_NAME;
var VIEWPORT_NAME = "ScrollAreaViewport";
var ScrollAreaViewport = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, children, nonce, ...viewportProps } = props;
    const context = useScrollAreaContext(VIEWPORT_NAME, __scopeScrollArea);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref, context.onViewportChange);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: `[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`
          },
          nonce
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-radix-scroll-area-viewport": "",
          ...viewportProps,
          ref: composedRefs,
          style: {
            /**
             * We don't support `visible` because the intention is to have at least one scrollbar
             * if this component is used and `visible` will behave like `auto` in that case
             * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
             *
             * We don't handle `auto` because the intention is for the native implementation
             * to be hidden if using this component. We just want to ensure the node is scrollable
             * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
             * the browser from having to work out whether to render native scrollbars or not,
             * we tell it to with the intention of hiding them in CSS.
             */
            overflowX: context.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: context.scrollbarYEnabled ? "scroll" : "hidden",
            ...props.style
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: context.onContentChange, style: { minWidth: "100%", display: "table" }, children })
        }
      )
    ] });
  }
);
ScrollAreaViewport.displayName = VIEWPORT_NAME;
var SCROLLBAR_NAME = "ScrollAreaScrollbar";
var ScrollAreaScrollbar = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
    const isHorizontal = props.orientation === "horizontal";
    reactExports.useEffect(() => {
      isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
      return () => {
        isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
      };
    }, [isHorizontal, onScrollbarXEnabledChange, onScrollbarYEnabledChange]);
    return context.type === "hover" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarHover, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "scroll" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarScroll, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "auto" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarAuto, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "always" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarVisible, { ...scrollbarProps, ref: forwardedRef }) : null;
  }
);
ScrollAreaScrollbar.displayName = SCROLLBAR_NAME;
var ScrollAreaScrollbarHover = reactExports.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const scrollArea = context.scrollArea;
    let hideTimer = 0;
    if (scrollArea) {
      const handlePointerEnter = () => {
        window.clearTimeout(hideTimer);
        setVisible(true);
      };
      const handlePointerLeave = () => {
        hideTimer = window.setTimeout(() => setVisible(false), context.scrollHideDelay);
      };
      scrollArea.addEventListener("pointerenter", handlePointerEnter);
      scrollArea.addEventListener("pointerleave", handlePointerLeave);
      return () => {
        window.clearTimeout(hideTimer);
        scrollArea.removeEventListener("pointerenter", handlePointerEnter);
        scrollArea.removeEventListener("pointerleave", handlePointerLeave);
      };
    }
  }, [context.scrollArea, context.scrollHideDelay]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || visible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarAuto,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarScroll = reactExports.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const isHorizontal = props.orientation === "horizontal";
  const debounceScrollEnd = useDebounceCallback(() => send("SCROLL_END"), 100);
  const [state, send] = useStateMachine("hidden", {
    hidden: {
      SCROLL: "scrolling"
    },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: {
      SCROLL: "interacting",
      POINTER_LEAVE: "idle"
    },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  reactExports.useEffect(() => {
    if (state === "idle") {
      const hideTimer = window.setTimeout(() => send("HIDE"), context.scrollHideDelay);
      return () => window.clearTimeout(hideTimer);
    }
  }, [state, context.scrollHideDelay, send]);
  reactExports.useEffect(() => {
    const viewport = context.viewport;
    const scrollDirection = isHorizontal ? "scrollLeft" : "scrollTop";
    if (viewport) {
      let prevScrollPos = viewport[scrollDirection];
      const handleScroll = () => {
        const scrollPos = viewport[scrollDirection];
        const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
        if (hasScrollInDirectionChanged) {
          send("SCROLL");
          debounceScrollEnd();
        }
        prevScrollPos = scrollPos;
      };
      viewport.addEventListener("scroll", handleScroll);
      return () => viewport.removeEventListener("scroll", handleScroll);
    }
  }, [context.viewport, isHorizontal, send, debounceScrollEnd]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || state !== "hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarVisible,
    {
      "data-state": state === "hidden" ? "hidden" : "visible",
      ...scrollbarProps,
      ref: forwardedRef,
      onPointerEnter: composeEventHandlers(props.onPointerEnter, () => send("POINTER_ENTER")),
      onPointerLeave: composeEventHandlers(props.onPointerLeave, () => send("POINTER_LEAVE"))
    }
  ) });
});
var ScrollAreaScrollbarAuto = reactExports.forwardRef((props, forwardedRef) => {
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const { forceMount, ...scrollbarProps } = props;
  const [visible, setVisible] = reactExports.useState(false);
  const isHorizontal = props.orientation === "horizontal";
  const handleResize = useDebounceCallback(() => {
    if (context.viewport) {
      const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
      const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
      setVisible(isHorizontal ? isOverflowX : isOverflowY);
    }
  }, 10);
  useResizeObserver(context.viewport, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || visible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarVisible,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarVisible = reactExports.forwardRef((props, forwardedRef) => {
  const { orientation = "vertical", ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const thumbRef = reactExports.useRef(null);
  const pointerOffsetRef = reactExports.useRef(0);
  const [sizes, setSizes] = reactExports.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  });
  const thumbRatio = getThumbRatio(sizes.viewport, sizes.content);
  const commonProps = {
    ...scrollbarProps,
    sizes,
    onSizesChange: setSizes,
    hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
    onThumbChange: (thumb) => thumbRef.current = thumb,
    onThumbPointerUp: () => pointerOffsetRef.current = 0,
    onThumbPointerDown: (pointerPos) => pointerOffsetRef.current = pointerPos
  };
  function getScrollPosition(pointerPos, dir) {
    return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, dir);
  }
  if (orientation === "horizontal") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaScrollbarX,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollLeft;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes, context.dir);
            thumbRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) context.viewport.scrollLeft = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) {
            context.viewport.scrollLeft = getScrollPosition(pointerPos, context.dir);
          }
        }
      }
    );
  }
  if (orientation === "vertical") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaScrollbarY,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollTop;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes);
            thumbRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) context.viewport.scrollTop = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) context.viewport.scrollTop = getScrollPosition(pointerPos);
        }
      }
    );
  }
  return null;
});
var ScrollAreaScrollbarX = reactExports.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = reactExports.useState();
  const ref = reactExports.useRef(null);
  const composeRefs2 = useComposedRefs(forwardedRef, ref, context.onScrollbarXChange);
  reactExports.useEffect(() => {
    if (ref.current) setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "horizontal",
      ...scrollbarProps,
      ref: composeRefs2,
      sizes,
      style: {
        bottom: 0,
        left: context.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: context.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        ["--radix-scroll-area-thumb-width"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.x),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.x),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollLeft + event.deltaX;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollWidth,
            viewport: context.viewport.offsetWidth,
            scrollbar: {
              size: ref.current.clientWidth,
              paddingStart: toInt(computedStyle.paddingLeft),
              paddingEnd: toInt(computedStyle.paddingRight)
            }
          });
        }
      }
    }
  );
});
var ScrollAreaScrollbarY = reactExports.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = reactExports.useState();
  const ref = reactExports.useRef(null);
  const composeRefs2 = useComposedRefs(forwardedRef, ref, context.onScrollbarYChange);
  reactExports.useEffect(() => {
    if (ref.current) setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "vertical",
      ...scrollbarProps,
      ref: composeRefs2,
      sizes,
      style: {
        top: 0,
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        ["--radix-scroll-area-thumb-height"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.y),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.y),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollTop + event.deltaY;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollHeight,
            viewport: context.viewport.offsetHeight,
            scrollbar: {
              size: ref.current.clientHeight,
              paddingStart: toInt(computedStyle.paddingTop),
              paddingEnd: toInt(computedStyle.paddingBottom)
            }
          });
        }
      }
    }
  );
});
var [ScrollbarProvider, useScrollbarContext] = createScrollAreaContext(SCROLLBAR_NAME);
var ScrollAreaScrollbarImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeScrollArea,
    sizes,
    hasThumb,
    onThumbChange,
    onThumbPointerUp,
    onThumbPointerDown,
    onThumbPositionChange,
    onDragScroll,
    onWheelScroll,
    onResize,
    ...scrollbarProps
  } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, __scopeScrollArea);
  const [scrollbar, setScrollbar] = reactExports.useState(null);
  const composeRefs2 = useComposedRefs(forwardedRef, (node) => setScrollbar(node));
  const rectRef = reactExports.useRef(null);
  const prevWebkitUserSelectRef = reactExports.useRef("");
  const viewport = context.viewport;
  const maxScrollPos = sizes.content - sizes.viewport;
  const handleWheelScroll = useCallbackRef(onWheelScroll);
  const handleThumbPositionChange = useCallbackRef(onThumbPositionChange);
  const handleResize = useDebounceCallback(onResize, 10);
  function handleDragScroll(event) {
    if (rectRef.current) {
      const x = event.clientX - rectRef.current.left;
      const y = event.clientY - rectRef.current.top;
      onDragScroll({ x, y });
    }
  }
  reactExports.useEffect(() => {
    const handleWheel = (event) => {
      const element = event.target;
      const isScrollbarWheel = scrollbar == null ? void 0 : scrollbar.contains(element);
      if (isScrollbarWheel) handleWheelScroll(event, maxScrollPos);
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => document.removeEventListener("wheel", handleWheel, { passive: false });
  }, [viewport, scrollbar, maxScrollPos, handleWheelScroll]);
  reactExports.useEffect(handleThumbPositionChange, [sizes, handleThumbPositionChange]);
  useResizeObserver(scrollbar, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollbarProvider,
    {
      scope: __scopeScrollArea,
      scrollbar,
      hasThumb,
      onThumbChange: useCallbackRef(onThumbChange),
      onThumbPointerUp: useCallbackRef(onThumbPointerUp),
      onThumbPositionChange: handleThumbPositionChange,
      onThumbPointerDown: useCallbackRef(onThumbPointerDown),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          ...scrollbarProps,
          ref: composeRefs2,
          style: { position: "absolute", ...scrollbarProps.style },
          onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
            const mainPointer = 0;
            if (event.button === mainPointer) {
              const element = event.target;
              element.setPointerCapture(event.pointerId);
              rectRef.current = scrollbar.getBoundingClientRect();
              prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
              document.body.style.webkitUserSelect = "none";
              if (context.viewport) context.viewport.style.scrollBehavior = "auto";
              handleDragScroll(event);
            }
          }),
          onPointerMove: composeEventHandlers(props.onPointerMove, handleDragScroll),
          onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
            const element = event.target;
            if (element.hasPointerCapture(event.pointerId)) {
              element.releasePointerCapture(event.pointerId);
            }
            document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
            if (context.viewport) context.viewport.style.scrollBehavior = "";
            rectRef.current = null;
          })
        }
      )
    }
  );
});
var THUMB_NAME = "ScrollAreaThumb";
var ScrollAreaThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...thumbProps } = props;
    const scrollbarContext = useScrollbarContext(THUMB_NAME, props.__scopeScrollArea);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || scrollbarContext.hasThumb, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaThumbImpl, { ref: forwardedRef, ...thumbProps }) });
  }
);
var ScrollAreaThumbImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, style, ...thumbProps } = props;
    const scrollAreaContext = useScrollAreaContext(THUMB_NAME, __scopeScrollArea);
    const scrollbarContext = useScrollbarContext(THUMB_NAME, __scopeScrollArea);
    const { onThumbPositionChange } = scrollbarContext;
    const composedRef = useComposedRefs(
      forwardedRef,
      (node) => scrollbarContext.onThumbChange(node)
    );
    const removeUnlinkedScrollListenerRef = reactExports.useRef(void 0);
    const debounceScrollEnd = useDebounceCallback(() => {
      if (removeUnlinkedScrollListenerRef.current) {
        removeUnlinkedScrollListenerRef.current();
        removeUnlinkedScrollListenerRef.current = void 0;
      }
    }, 100);
    reactExports.useEffect(() => {
      const viewport = scrollAreaContext.viewport;
      if (viewport) {
        const handleScroll = () => {
          debounceScrollEnd();
          if (!removeUnlinkedScrollListenerRef.current) {
            const listener = addUnlinkedScrollListener(viewport, onThumbPositionChange);
            removeUnlinkedScrollListenerRef.current = listener;
            onThumbPositionChange();
          }
        };
        onThumbPositionChange();
        viewport.addEventListener("scroll", handleScroll);
        return () => viewport.removeEventListener("scroll", handleScroll);
      }
    }, [scrollAreaContext.viewport, debounceScrollEnd, onThumbPositionChange]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": scrollbarContext.hasThumb ? "visible" : "hidden",
        ...thumbProps,
        ref: composedRef,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...style
        },
        onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, (event) => {
          const thumb = event.target;
          const thumbRect = thumb.getBoundingClientRect();
          const x = event.clientX - thumbRect.left;
          const y = event.clientY - thumbRect.top;
          scrollbarContext.onThumbPointerDown({ x, y });
        }),
        onPointerUp: composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)
      }
    );
  }
);
ScrollAreaThumb.displayName = THUMB_NAME;
var CORNER_NAME = "ScrollAreaCorner";
var ScrollAreaCorner = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useScrollAreaContext(CORNER_NAME, props.__scopeScrollArea);
    const hasBothScrollbarsVisible = Boolean(context.scrollbarX && context.scrollbarY);
    const hasCorner = context.type !== "scroll" && hasBothScrollbarsVisible;
    return hasCorner ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaCornerImpl, { ...props, ref: forwardedRef }) : null;
  }
);
ScrollAreaCorner.displayName = CORNER_NAME;
var ScrollAreaCornerImpl = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeScrollArea, ...cornerProps } = props;
  const context = useScrollAreaContext(CORNER_NAME, __scopeScrollArea);
  const [width, setWidth] = reactExports.useState(0);
  const [height, setHeight] = reactExports.useState(0);
  const hasSize = Boolean(width && height);
  useResizeObserver(context.scrollbarX, () => {
    var _a;
    const height2 = ((_a = context.scrollbarX) == null ? void 0 : _a.offsetHeight) || 0;
    context.onCornerHeightChange(height2);
    setHeight(height2);
  });
  useResizeObserver(context.scrollbarY, () => {
    var _a;
    const width2 = ((_a = context.scrollbarY) == null ? void 0 : _a.offsetWidth) || 0;
    context.onCornerWidthChange(width2);
    setWidth(width2);
  });
  return hasSize ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      ...cornerProps,
      ref: forwardedRef,
      style: {
        width,
        height,
        position: "absolute",
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...props.style
      }
    }
  ) : null;
});
function toInt(value) {
  return value ? parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
  const ratio = viewportSize / contentSize;
  return isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
  const ratio = getThumbRatio(sizes.viewport, sizes.content);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
  return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer(pointerPos, pointerOffset, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const thumbCenter = thumbSizePx / 2;
  const offset = pointerOffset || thumbCenter;
  const thumbOffsetFromEnd = thumbSizePx - offset;
  const minPointerPos = sizes.scrollbar.paddingStart + offset;
  const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
  const maxScrollPos = sizes.content - sizes.viewport;
  const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange);
  return interpolate(pointerPos);
}
function getThumbOffsetFromScroll(scrollPos, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const scrollbar = sizes.scrollbar.size - scrollbarPadding;
  const maxScrollPos = sizes.content - sizes.viewport;
  const maxThumbPos = scrollbar - thumbSizePx;
  const scrollClampRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const scrollWithoutMomentum = clamp(scrollPos, scrollClampRange);
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
  return interpolate(scrollWithoutMomentum);
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
  return scrollPos > 0 && scrollPos < maxScrollPos;
}
var addUnlinkedScrollListener = (node, handler = () => {
}) => {
  let prevPosition = { left: node.scrollLeft, top: node.scrollTop };
  let rAF = 0;
  (function loop() {
    const position = { left: node.scrollLeft, top: node.scrollTop };
    const isHorizontalScroll = prevPosition.left !== position.left;
    const isVerticalScroll = prevPosition.top !== position.top;
    if (isHorizontalScroll || isVerticalScroll) handler();
    prevPosition = position;
    rAF = window.requestAnimationFrame(loop);
  })();
  return () => window.cancelAnimationFrame(rAF);
};
function useDebounceCallback(callback, delay) {
  const handleCallback = useCallbackRef(callback);
  const debounceTimerRef = reactExports.useRef(0);
  reactExports.useEffect(() => () => window.clearTimeout(debounceTimerRef.current), []);
  return reactExports.useCallback(() => {
    window.clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = window.setTimeout(handleCallback, delay);
  }, [handleCallback, delay]);
}
function useResizeObserver(element, onResize) {
  const handleResize = useCallbackRef(onResize);
  useLayoutEffect2(() => {
    let rAF = 0;
    if (element) {
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(rAF);
        rAF = window.requestAnimationFrame(handleResize);
      });
      resizeObserver.observe(element);
      return () => {
        window.cancelAnimationFrame(rAF);
        resizeObserver.unobserve(element);
      };
    }
  }, [element, handleResize]);
}
var Root = ScrollArea$1;
var Viewport = ScrollAreaViewport;
var Corner = ScrollAreaCorner;
function ScrollArea({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Root,
    {
      "data-slot": "scroll-area",
      className: cn("relative", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
            children
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollBar, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Corner, {})
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbar,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation,
      className: cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ScrollAreaThumb,
        {
          "data-slot": "scroll-area-thumb",
          className: "bg-border relative flex-1 rounded-full"
        }
      )
    }
  );
}
function formatEventLabel(event) {
  const kind = event.kind;
  if (kind.__kind__ === "Rolled") {
    const total = Number(kind.Rolled.die1) + Number(kind.Rolled.die2);
    return `rolled ${kind.Rolled.die1}+${kind.Rolled.die2} = ${total}`;
  }
  if (kind.__kind__ === "Moved") {
    const sq = BOARD_SQUARES[Number(kind.Moved.to)];
    return `moved to ${(sq == null ? void 0 : sq.name) ?? `space ${kind.Moved.to}`}`;
  }
  if (kind.__kind__ === "PropertyBought") {
    const sq = BOARD_SQUARES[Number(kind.PropertyBought.square)];
    return `bought ${(sq == null ? void 0 : sq.name) ?? "property"} for $${kind.PropertyBought.price}`;
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
  return kind.__kind__;
}
function eventColor(kind) {
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
function formatTimestamp(ts) {
  const ms = Number(ts / 1000000n);
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}
function EventLog({ events, myId }) {
  const bottomRef = reactExports.useRef(null);
  const eventsLen = events.length;
  reactExports.useEffect(() => {
    var _a;
    (_a = bottomRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, [eventsLen]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", "data-ocid": "event-log", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 border-b border-border shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider", children: "Event Log" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2 space-y-1", children: [
      events.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-muted-foreground py-3 text-center font-body",
          "data-ocid": "event-log-empty",
          children: "No events yet — game starts when all players are ready."
        }
      ),
      events.map((ev, idx) => {
        const playerId = ev.player.toText();
        const isMe = playerId === myId;
        const shortId = isMe ? "You" : `${playerId.slice(0, 6)}…`;
        const label = formatEventLabel(ev);
        const color = eventColor(ev.kind);
        const ts = formatTimestamp(ev.timestamp);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-2 py-0.5 group",
            "data-ocid": "event-log-entry",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `font-mono text-[10px] shrink-0 mt-0.5 ${isMe ? "text-[oklch(var(--mono-yellow))]" : "text-muted-foreground"}`,
                  children: shortId
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-body flex-1 ${color}`, children: label }),
              ts && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-foreground/50 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity", children: ts })
            ]
          },
          `${ev.timestamp.toString()}-${idx}`
        );
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
    ] }) })
  ] });
}
function formatPrincipal(id) {
  if (id.length <= 12) return id;
  return `${id.slice(0, 6)}…${id.slice(-4)}`;
}
function PlayerRow({
  player,
  playerIndex,
  isMe,
  isCurrentTurn,
  isHost
}) {
  var _a;
  const positionName = ((_a = BOARD_SQUARES[Number(player.position)]) == null ? void 0 : _a.name) ?? `Space ${player.position}`;
  const shortId = isMe ? "You" : formatPrincipal(player.id.toText());
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: [
        "flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all duration-200",
        isCurrentTurn ? "border-primary/40 bg-primary/10" : "border-transparent bg-muted/30",
        player.isBankrupt ? "opacity-40" : ""
      ].filter(Boolean).join(" "),
      "data-ocid": `player-panel-row-${playerIndex}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          PlayerToken,
          {
            playerIndex,
            size: "md",
            isActive: isCurrentTurn,
            isMe
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-foreground font-semibold truncate max-w-[100px]", children: shortId }),
            isHost && /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-3 h-3 text-[oklch(var(--mono-yellow))] shrink-0" }),
            isCurrentTurn && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "default",
                className: "text-[9px] px-1 py-0 h-4 shrink-0",
                children: "TURN"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-body truncate mt-0.5", children: positionName })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-foreground font-bold", children: [
            "$",
            Number(player.cash).toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
            player.inJail && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: "In Jail", "aria-label": "In Jail", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Gavel, { className: "w-3 h-3 text-[oklch(var(--mono-red))]" }) }),
            player.isBankrupt && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: "Bankrupt", "aria-label": "Bankrupt", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skull, { className: "w-3 h-3 text-muted-foreground" }) }),
            !player.isReady && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "warning", className: "text-[9px] px-1 py-0 h-4", children: "Not Ready" })
          ] })
        ] })
      ]
    }
  );
}
function PlayerPanel({ game, myId }) {
  const activePlayers = game.players.filter((p) => !p.isBankrupt);
  const bankruptPlayers = game.players.filter((p) => p.isBankrupt);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", "data-ocid": "player-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider", children: "Players" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "muted", className: "text-[10px]", children: [
        activePlayers.length,
        "/",
        game.players.length,
        " active"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: game.players.map((player, i) => {
      if (player.isBankrupt) return null;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        PlayerRow,
        {
          player,
          playerIndex: i,
          isMe: player.id.toText() === myId,
          isCurrentTurn: game.phase === GamePhase.Playing && Number(game.turnIndex) === i,
          isHost: player.id.toText() === game.host.toText()
        },
        player.id.toText()
      );
    }) }),
    bankruptPlayers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-display font-medium text-muted-foreground/60 uppercase tracking-wider px-1", children: "Eliminated" }),
      game.players.map((player, i) => {
        if (!player.isBankrupt) return null;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          PlayerRow,
          {
            player,
            playerIndex: i,
            isMe: player.id.toText() === myId,
            isCurrentTurn: false,
            isHost: false
          },
          player.id.toText()
        );
      })
    ] })
  ] });
}
function PropertyAction({
  square,
  playerCash,
  isBuying,
  onBuy,
  onPass
}) {
  const price = square.price ?? 0;
  const canAfford = Number(playerCash) >= price;
  const colorHex = square.colorGroup ? COLOR_GROUP_HEX[square.colorGroup] : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-lg border border-border bg-card p-3 space-y-3",
      "data-ocid": "property-action",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
          colorHex && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-3 h-full min-h-[2.5rem] rounded-sm shrink-0",
              style: { background: colorHex },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground leading-tight", children: square.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: square.kind === "railroad" ? "outline" : "muted",
                  className: "text-[10px]",
                  children: square.kind
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground mt-0.5", children: "Unowned — available to purchase" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-muted/40 rounded px-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body", children: "Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold text-sm text-foreground", children: [
            "$",
            price.toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body", children: "Your cash" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `font-mono text-xs font-semibold ${canAfford ? "text-[oklch(var(--mono-green))]" : "text-destructive"}`,
              children: [
                "$",
                Number(playerCash).toLocaleString()
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "gold",
              className: "flex-1 font-display font-bold text-sm",
              onClick: onBuy,
              disabled: !canAfford || isBuying,
              loading: isBuying,
              "data-ocid": "buy-property-btn",
              "aria-label": `Buy ${square.name} for $${price}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-3.5 h-3.5" }),
                "Buy — $",
                price.toLocaleString()
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "icon",
              onClick: onPass,
              disabled: isBuying,
              "data-ocid": "pass-property-btn",
              "aria-label": "Pass on this property",
              title: "Pass",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        !canAfford && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive font-body text-center", children: "Not enough cash to buy this property." })
      ]
    }
  );
}
function GamePage() {
  var _a, _b;
  const { gameId } = useParams({ from: "/game/$gameId" });
  const { principal } = useAuth();
  const backend = useBackend();
  const queryClient = useQueryClient();
  const [diceResult, setDiceResult] = reactExports.useState(null);
  const [hasRolledThisTurn, setHasRolledThisTurn] = reactExports.useState(false);
  const [passedProperty, setPassedProperty] = reactExports.useState(false);
  const {
    data: game,
    isLoading,
    error
  } = useQuery({
    queryKey: ["game", gameId],
    queryFn: () => backend.getGame(gameId),
    enabled: backend.isReady && !!gameId,
    refetchInterval: 2e3
  });
  const myId = principal == null ? void 0 : principal.toText();
  const me = game == null ? void 0 : game.players.find((p) => p.id.toText() === myId);
  const isMyTurn = game != null && game.phase === GamePhase.Playing && ((_a = game.players[Number(game.turnIndex)]) == null ? void 0 : _a.id.toText()) === myId;
  const prevTurnIndexRef = reactExports.useRef(null);
  const turnIndex = game != null ? Number(game.turnIndex) : null;
  reactExports.useEffect(() => {
    if (turnIndex == null) return;
    if (prevTurnIndexRef.current !== null && prevTurnIndexRef.current !== turnIndex) {
      setPassedProperty(false);
      setHasRolledThisTurn(false);
    }
    prevTurnIndexRef.current = turnIndex;
  }, [turnIndex]);
  const readyMutation = useMutation({
    mutationFn: () => backend.setReady(gameId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["game", gameId] })
  });
  const rollMutation = useMutation({
    mutationFn: () => backend.rollDice(gameId),
    onSuccess: (result) => {
      if (result.__kind__ === "Ok") {
        setDiceResult({
          die1: Number(result.Ok.die1),
          die2: Number(result.Ok.die2)
        });
        setHasRolledThisTurn(true);
        setPassedProperty(false);
        queryClient.invalidateQueries({ queryKey: ["game", gameId] });
      }
    }
  });
  const buyMutation = useMutation({
    mutationFn: () => backend.buyProperty(gameId),
    onSuccess: () => {
      setHasRolledThisTurn(false);
      setPassedProperty(false);
      queryClient.invalidateQueries({ queryKey: ["game", gameId] });
    }
  });
  const passMutation = useMutation({
    mutationFn: () => backend.passProperty(gameId),
    onSuccess: () => {
      setHasRolledThisTurn(false);
      setPassedProperty(true);
      queryClient.invalidateQueries({ queryKey: ["game", gameId] });
    }
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Loading game…" }) });
  }
  if (error || !game) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center min-h-[60vh] px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { message: "Game not found or failed to load." }) });
  }
  const currentSquare = me ? BOARD_SQUARES[Number(me.position)] : null;
  const serverPendingBuy = game.pendingBuySquare != null;
  const canBuy = (hasRolledThisTurn || serverPendingBuy) && !passedProperty && currentSquare != null && (currentSquare.kind === "property" || currentSquare.kind === "railroad" || currentSquare.kind === "utility") && !game.properties.some((p) => Number(p.square) === Number(me == null ? void 0 : me.position));
  const winner = game.phase === GamePhase.Finished ? game.players.find((p) => !p.isBankrupt) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col lg:flex-row bg-background overflow-hidden relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center p-4 bg-muted/10 border-b lg:border-b-0 lg:border-r border-border overflow-hidden min-h-[280px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      MonopolyBoard,
      {
        game,
        myId,
        onBuyProperty: () => buyMutation.mutate(),
        isBuying: buyMutation.isPending
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full lg:w-80 flex flex-col bg-card border-l border-border overflow-y-auto max-h-[calc(100vh-56px)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border px-4 py-3 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-sm text-foreground", children: [
            "Game",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
              "#",
              gameId.slice(0, 8)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: game.phase === GamePhase.Playing ? "success" : "muted",
              children: game.phase
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
          "Stake: ",
          game.stakeAmount.toString(),
          " ",
          game.currency,
          " ·",
          " ",
          game.players.length,
          " players"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border px-3 py-3 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlayerPanel, { game, myId }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 space-y-3 shrink-0 border-b border-border", children: [
        game.phase === GamePhase.Lobby && me && !me.isReady && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body text-center", children: [
            game.players.filter((p) => p.isReady).length,
            "/",
            game.players.length,
            " players ready"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "gold",
              className: "w-full font-display font-bold",
              onClick: () => readyMutation.mutate(),
              loading: readyMutation.isPending,
              "data-ocid": "ready-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
                "Mark Ready"
              ]
            }
          )
        ] }),
        game.phase === GamePhase.Lobby && (me == null ? void 0 : me.isReady) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-center gap-2 py-2",
            "data-ocid": "ready-status",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-[oklch(var(--mono-green))]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-display font-semibold text-[oklch(var(--mono-green))]", children: "You are Ready" })
            ]
          }
        ),
        game.phase === GamePhase.Lobby && !me && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body text-center py-2", children: "Spectating this game." }),
        game.phase === GamePhase.Playing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DiceRoller,
            {
              isMyTurn,
              isRolling: rollMutation.isPending,
              lastResult: diceResult,
              onRoll: () => rollMutation.mutate()
            }
          ),
          rollMutation.error && /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMessage, { message: "Roll failed. Please try again." }),
          canBuy && currentSquare && me && /* @__PURE__ */ jsxRuntimeExports.jsx(
            PropertyAction,
            {
              square: currentSquare,
              playerCash: me.cash,
              isBuying: buyMutation.isPending,
              onBuy: () => buyMutation.mutate(),
              onPass: () => passMutation.mutate()
            }
          ),
          !isMyTurn && !hasRolledThisTurn && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground font-body py-1", children: [
            "Waiting for",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-semibold font-mono", children: [
              (_b = game.players[Number(game.turnIndex)]) == null ? void 0 : _b.id.toText().slice(0, 8),
              "…"
            ] })
          ] })
        ] }),
        game.phase === GamePhase.Finished && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-2 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-base text-foreground", children: "Game Finished" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Winner receives the full pot via on-chain payout." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col min-h-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EventLog, { events: game.events, myId }) })
    ] }),
    winner && /* @__PURE__ */ jsxRuntimeExports.jsx(
      WinnerOverlay,
      {
        winner,
        isMe: winner.id.toText() === myId,
        potAmount: game.stakeAmount * BigInt(game.players.length),
        currency: game.currency
      }
    )
  ] });
}
function WinnerOverlay({
  winner,
  isMe,
  potAmount,
  currency
}) {
  const [dismissed, setDismissed] = reactExports.useState(false);
  if (dismissed) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "absolute inset-0 bg-[oklch(0_0_0/0.75)] flex items-center justify-center z-50 backdrop-blur-sm",
      "data-ocid": "winner-overlay",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-8 max-w-sm w-full mx-4 text-center space-y-4 shadow-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-12 h-12 text-[oklch(var(--mono-yellow))]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-black text-2xl text-foreground leading-tight", children: isMe ? "You Won!" : "Game Over" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body mt-1", children: isMe ? "Congratulations — last player standing!" : `${winner.id.toText().slice(0, 12)}… wins` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg px-4 py-3 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Total pot" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono font-bold text-xl text-[oklch(var(--mono-yellow))]", children: [
            potAmount.toString(),
            " ",
            currency
          ] }),
          isMe && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[oklch(var(--mono-green))] font-body", children: "✓ On-chain payout confirmed" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "w-full",
            onClick: () => setDismissed(true),
            "data-ocid": "dismiss-winner-btn",
            children: "View Final Board"
          }
        )
      ] })
    }
  );
}
export {
  GamePage as default
};
