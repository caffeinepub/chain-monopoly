import GameTypes "types/games";
import Common "types/common";
import EscrowLib "lib/escrow";
import PlayerTypes "types/players";
import Map "mo:core/Map";

module {
  // ── Old types (from .old/src/backend) ──────────────────────────────────────
  type OldGame = {
    id : Common.GameId;
    var host : Common.UserId;
    var phase : Common.GamePhase;
    var players : [PlayerTypes.Player];
    var turnIndex : Nat;
    var stakeAmount : Nat;
    var currency : Common.Currency;
    var properties : [GameTypes.PropertyOwnership];
    var events : [Common.GameEvent];
    var escrowLocked : Bool;
    var createdAt : Common.Timestamp;
    // pendingBuySquare NOT present in old version
  };

  type OldActor = {
    games : Map.Map<Common.GameId, OldGame>;
    players : Map.Map<Common.UserId, PlayerTypes.Player>;
    escrows : Map.Map<Common.GameId, EscrowLib.EscrowRecord>;
  };

  // ── New actor state ─────────────────────────────────────────────────────────
  type NewActor = {
    games : Map.Map<Common.GameId, GameTypes.Game>;
    players : Map.Map<Common.UserId, PlayerTypes.Player>;
    escrows : Map.Map<Common.GameId, EscrowLib.EscrowRecord>;
  };

  public func run(old : OldActor) : NewActor {
    let newGames = old.games.map<Common.GameId, OldGame, GameTypes.Game>(
      func(_id, g) {
        {
          id = g.id;
          var host = g.host;
          var phase = g.phase;
          var players = g.players;
          var turnIndex = g.turnIndex;
          var stakeAmount = g.stakeAmount;
          var currency = g.currency;
          var properties = g.properties;
          var events = g.events;
          var escrowLocked = g.escrowLocked;
          var createdAt = g.createdAt;
          var pendingBuySquare = null : ?Nat;
        }
      }
    );
    {
      games = newGames;
      players = old.players;
      escrows = old.escrows;
    }
  };
};
