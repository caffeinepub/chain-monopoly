import type { Principal } from "@icp-sdk/core/principal";
import type {
  BuyPropertyResult,
  CreateGameArgs,
  EventKind,
  GameEvent,
  GameView,
  JoinGameResult,
  PlayerView,
  PropertyOwnership,
  RollResult,
} from "../backend";
import { Currency, GamePhase } from "../backend";

export type UserId = Principal;
export type GameId = string;

export type {
  GameView,
  PlayerView,
  GameEvent,
  EventKind,
  PropertyOwnership,
  CreateGameArgs,
  JoinGameResult,
  RollResult,
  BuyPropertyResult,
};

export { Currency, GamePhase };

export interface WalletBalance {
  icp: bigint;
  ckbtc: bigint;
  loading: boolean;
  error: string | null;
}

export type BoardSquareKind =
  | "go"
  | "property"
  | "railroad"
  | "utility"
  | "tax"
  | "jail"
  | "free-parking"
  | "go-to-jail"
  | "chance"
  | "community-chest"
  | "corner";

export type ColorGroup =
  | "brown"
  | "light-blue"
  | "pink"
  | "orange"
  | "red"
  | "yellow"
  | "green"
  | "dark-blue"
  | null;

export interface BoardSquare {
  index: number;
  name: string;
  kind: BoardSquareKind;
  price: number | null;
  colorGroup: ColorGroup;
  rent: number[];
}
