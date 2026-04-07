import Common "common";
import PlayerTypes "players";

module {
  public type ColorGroup = {
    #Brown;
    #LightBlue;
    #Pink;
    #Orange;
    #Red;
    #Yellow;
    #Green;
    #DarkBlue;
    #Railroad;
    #Utility;
  };

  public type SquareKind = {
    #Go;
    #Property : { name : Text; price : Nat; rents : [Nat]; group : ColorGroup };
    #Railroad : { name : Text; price : Nat };
    #Utility : { name : Text; price : Nat };
    #CommunityChest;
    #Chance;
    #Tax : { name : Text; amount : Nat };
    #Jail;
    #FreeParking;
    #GoToJail;
  };

  public type PropertyOwnership = {
    square : Nat;
    owner : Common.UserId;
  };

  public type Game = {
    id : Common.GameId;
    var host : Common.UserId;
    var phase : Common.GamePhase;
    var players : [PlayerTypes.Player];
    var turnIndex : Nat;
    var stakeAmount : Nat;
    var currency : Common.Currency;
    var properties : [PropertyOwnership];
    var events : [Common.GameEvent];
    var escrowLocked : Bool;
    var createdAt : Common.Timestamp;
    var pendingBuySquare : ?Nat;
  };

  public type GameView = {
    id : Common.GameId;
    host : Common.UserId;
    phase : Common.GamePhase;
    players : [PlayerTypes.PlayerView];
    turnIndex : Nat;
    stakeAmount : Nat;
    currency : Common.Currency;
    properties : [PropertyOwnership];
    events : [Common.GameEvent];
    escrowLocked : Bool;
    pendingBuySquare : ?Nat;
  };

  public type CreateGameArgs = {
    stakeAmount : Nat;
    currency : Common.Currency;
  };

  public type JoinGameResult = {
    #Ok : GameView;
    #Err : Text;
  };

  public type RollResult = {
    #Ok : { die1 : Nat; die2 : Nat; newPosition : Nat; event : Text };
    #Err : Text;
  };

  public type BuyPropertyResult = {
    #Ok : GameView;
    #Err : Text;
  };
};
