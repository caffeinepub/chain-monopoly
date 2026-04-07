import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface GameView {
    id: GameId;
    pendingBuySquare?: bigint;
    host: UserId;
    stakeAmount: bigint;
    properties: Array<PropertyOwnership>;
    players: Array<PlayerView>;
    turnIndex: bigint;
    events: Array<GameEvent>;
    currency: Currency;
    phase: GamePhase;
    escrowLocked: boolean;
}
export interface PropertyOwnership {
    owner: UserId;
    square: bigint;
}
export type JoinGameResult = {
    __kind__: "Ok";
    Ok: GameView;
} | {
    __kind__: "Err";
    Err: string;
};
export type EventKind = {
    __kind__: "PlayerJoined";
    PlayerJoined: {
        player: UserId;
    };
} | {
    __kind__: "GameWon";
    GameWon: {
        winner: UserId;
    };
} | {
    __kind__: "Bankrupt";
    Bankrupt: null;
} | {
    __kind__: "Moved";
    Moved: {
        to: bigint;
        from: bigint;
    };
} | {
    __kind__: "SentToJail";
    SentToJail: null;
} | {
    __kind__: "RentPaid";
    RentPaid: {
        to: UserId;
        from: UserId;
        amount: bigint;
    };
} | {
    __kind__: "TaxPaid";
    TaxPaid: {
        amount: bigint;
    };
} | {
    __kind__: "PropertyBought";
    PropertyBought: {
        square: bigint;
        price: bigint;
    };
} | {
    __kind__: "Rolled";
    Rolled: {
        die1: bigint;
        die2: bigint;
    };
} | {
    __kind__: "GameStarted";
    GameStarted: null;
};
export type BuyPropertyResult = {
    __kind__: "Ok";
    Ok: GameView;
} | {
    __kind__: "Err";
    Err: string;
};
export type UserId = Principal;
export type RollResult = {
    __kind__: "Ok";
    Ok: {
        die1: bigint;
        die2: bigint;
        event: string;
        newPosition: bigint;
    };
} | {
    __kind__: "Err";
    Err: string;
};
export type GameId = string;
export interface GameEvent {
    player: UserId;
    kind: EventKind;
    timestamp: Timestamp;
}
export interface CreateGameArgs {
    stakeAmount: bigint;
    currency: Currency;
}
export interface PlayerView {
    id: UserId;
    isBankrupt: boolean;
    cash: bigint;
    inJail: boolean;
    isReady: boolean;
    position: bigint;
}
export enum Currency {
    ICP = "ICP",
    ckBTC = "ckBTC"
}
export enum GamePhase {
    Lobby = "Lobby",
    Playing = "Playing",
    Finished = "Finished"
}
export interface backendInterface {
    buyProperty(gameId: GameId): Promise<BuyPropertyResult>;
    createGame(args: CreateGameArgs): Promise<GameView>;
    getEvents(gameId: GameId, limit: bigint): Promise<Array<GameEvent>>;
    getGame(gameId: GameId): Promise<GameView | null>;
    getOrCreatePlayer(): Promise<PlayerView>;
    getPlayer(playerId: UserId): Promise<PlayerView | null>;
    joinGame(gameId: GameId): Promise<JoinGameResult>;
    listOpenGames(): Promise<Array<GameView>>;
    passProperty(gameId: GameId): Promise<JoinGameResult>;
    rollDice(gameId: GameId): Promise<RollResult>;
    setReady(gameId: GameId): Promise<JoinGameResult>;
}
