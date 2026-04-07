import { useActor } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";
import type { GameId } from "../backend";
import type {
  BuyPropertyResult,
  CreateGameArgs,
  GameEvent,
  GameView,
  JoinGameResult,
  PlayerView,
  RollResult,
} from "../types/game";

export type PassPropertyResult = JoinGameResult;

export interface BackendHook {
  createGame: (args: CreateGameArgs) => Promise<GameView>;
  joinGame: (gameId: GameId) => Promise<JoinGameResult>;
  setReady: (gameId: GameId) => Promise<JoinGameResult>;
  rollDice: (gameId: GameId) => Promise<RollResult>;
  buyProperty: (gameId: GameId) => Promise<BuyPropertyResult>;
  passProperty: (gameId: GameId) => Promise<PassPropertyResult>;
  getGame: (gameId: GameId) => Promise<GameView | null>;
  listOpenGames: () => Promise<GameView[]>;
  getOrCreatePlayer: () => Promise<PlayerView>;
  getEvents: (gameId: GameId, limit: bigint) => Promise<GameEvent[]>;
  isReady: boolean;
}

export function useBackend(): BackendHook {
  const { actor, isFetching } = useActor(createActor);

  const isReady = !isFetching && actor != null;

  return {
    isReady,
    createGame: async (args) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createGame(args);
    },
    joinGame: async (gameId) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.joinGame(gameId);
    },
    setReady: async (gameId) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.setReady(gameId);
    },
    rollDice: async (gameId) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.rollDice(gameId);
    },
    buyProperty: async (gameId) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.buyProperty(gameId);
    },
    passProperty: async (gameId) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.passProperty(gameId);
    },
    getGame: async (gameId) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getGame(gameId);
    },
    listOpenGames: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.listOpenGames();
    },
    getOrCreatePlayer: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getOrCreatePlayer();
    },
    getEvents: async (gameId, limit) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getEvents(gameId, limit);
    },
  };
}
