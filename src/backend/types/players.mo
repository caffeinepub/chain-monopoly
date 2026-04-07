import Common "common";

module {
  public type Player = {
    id : Common.UserId;
    var position : Nat;
    var cash : Nat;
    var inJail : Bool;
    var jailTurns : Nat;
    var isBankrupt : Bool;
    var isReady : Bool;
  };

  public type PlayerView = {
    id : Common.UserId;
    position : Nat;
    cash : Nat;
    inJail : Bool;
    isBankrupt : Bool;
    isReady : Bool;
  };
};
