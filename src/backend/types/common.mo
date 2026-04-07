module {
  public type UserId = Principal;
  public type GameId = Text;
  public type Timestamp = Int;

  public type Currency = {
    #ICP;
    #ckBTC;
  };

  public type GamePhase = {
    #Lobby;
    #Playing;
    #Finished;
  };

  public type EventKind = {
    #Rolled : { die1 : Nat; die2 : Nat };
    #Moved : { from : Nat; to : Nat };
    #PropertyBought : { square : Nat; price : Nat };
    #RentPaid : { from : UserId; to : UserId; amount : Nat };
    #TaxPaid : { amount : Nat };
    #SentToJail;
    #Bankrupt;
    #GameWon : { winner : UserId };
    #PlayerJoined : { player : UserId };
    #GameStarted;
  };

  public type GameEvent = {
    player : UserId;
    kind : EventKind;
    timestamp : Timestamp;
  };
};
