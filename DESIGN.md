# Design Brief: Chain Monopoly

## Tone & Purpose
Dark, premium crypto/blockchain aesthetic meets classic board game precision. High-stakes betting interface for 2-4 ICP/ckBTC players. Responsive, high-contrast game board as centerpiece. No generic AI visuals — brutalist, color-blocked layout.

## Palette
| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| Background | `0.99 0 0` | `0.12 0 0` | Deep slate, near-black |
| Foreground | `0.15 0 0` | `0.95 0 0` | Pure white/black text |
| Primary | `0.35 0.1 260` | `0.85 0.15 280` | Crypto indigo (buttons, active) |
| Card | `1.0 0 0` | `0.16 0 0` | Elevated surfaces, game log |
| Accent | `0.6 0.15 280` | `0.75 0.2 280` | Highlights, interactive states |
| Destructive | `0.55 0.22 25` | `0.65 0.19 22` | Bankruptcy, property loss |

## Monopoly Property Colors
Eight property group accent tokens for board spaces (utilities: neutral grey):
- Dark Blue: `0.28 0.23 265` (light) / `0.68 0.23 265` (dark)
- Green: `0.5 0.2 142` (light) / `0.65 0.2 142` (dark)
- Yellow: `0.78 0.18 96` (light) / `0.82 0.18 96` (dark)
- Red: `0.55 0.22 25` (light) / `0.68 0.22 25` (dark)
- Orange: `0.65 0.19 60` (light) / `0.72 0.19 60` (dark)
- Pink: `0.55 0.2 340` (light) / `0.68 0.2 340` (dark)
- Light Blue: `0.68 0.15 250` (light) / `0.75 0.15 250` (dark)
- Brown: `0.45 0.12 30` (light) / `0.58 0.12 30` (dark)

## Typography
- Display: Bricolage Grotesque (geometric, confident, board game authority)
- Body: General Sans (refined, readable, subtle warmth)
- Mono: JetBrains Mono (wallet addresses, token amounts, precision)

## Structural Zones
| Zone | Light BG | Dark BG | Purpose |
|------|----------|---------|---------|
| Header | `card` (white) | `card` (0.16) | Game title, player list, wallet balances, border-b |
| Game Board | `background` (0.99) | `background` (0.12) | 40 spaces with property colors punching through, dice roll area |
| Event Log | `card` (white) + border-l | `card` (0.16) + border-l | Transaction/rent history, sidebar overlay |
| Lobby Modal | `popover` (white) | `popover` (0.2) | Player join/stake selection, centered overlay |
| Footer/Actions | `card` + border-t | `card` + border-t | Game controls, End Turn, Pay Rent buttons |

## Shape Language
- Radius: `0.375rem` (tight, precision-focused, board game squares)
- Spacing: 4/8/16/24px density (compact board, dense info)
- Shadows: subtle `shadow-xs` only; no glow or soft blur
- Borders: 1px solid `border` token; 2px on active/focused elements

## Key UI Patterns
- **Board Spaces**: Color-blocked property zones with CSS utility classes (`.mono-dark-blue`, etc.); labels + rent values overlay
- **Player Tokens**: Numbered circles (1–4), positioned absolutely on board
- **Dice Roll**: Large, centered, triggered by hover/click; animation frame-based
- **Wallet Display**: Monospace, live balance sync; ICP and ckBTC side-by-side
- **Betting UI**: Slider + input for stake amount; clear risk/reward messaging
- **Property Cards**: Minimal, readable; owner name, rent scale, unmortgage option
- **Event Log**: Timestamp + action (e.g., "Player 2 paid $120 rent to Player 1")

## Motion & Interaction
- **Dice Roll**: 0.5s spin animation, then bounce to final face
- **Property Acquisition**: Subtle fade + scale-up on ownership change
- **Rent Collection**: Color flash on payment (destructive accent)
- **Game Over**: Full-screen overlay, winner announcement, payout confirmation

## Accessibility & Constraints
- AA contrast maintained in both light and dark (no opacity-only contrast)
- High contrast on game elements for clarity during play
- Monospace for all numeric values (wallet, rent, stake)
- Mobile-first responsive (board scales to fit viewport)
- No animations block interaction (all use will-change or GPU layers)

## Signature Detail
The 40-space Monopoly board rendered as a CSS grid with color-blocked property groups. Property colors are primary visual hierarchy — they guide the eye and create visual rhythm. Dark background makes colors pop without gimmicks (no gradients, glows, or shadows). Winner's payout is displayed via blockchain transaction hash in monospace — premium crypto detail.
