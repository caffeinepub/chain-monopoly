import Common "../types/common";
import Array "mo:core/Array";
import Principal "mo:core/Principal";

// Escrow holds player stakes and releases full pot to winner on game end.
// Since on-chain ICP/ckBTC transfers require ledger canister calls,
// the escrow here records locked balances; payout is triggered by the game engine.
module {
  public type EscrowRecord = {
    gameId : Common.GameId;
    var lockedPlayers : [Common.UserId];
    stakeAmount : Nat;
    currency : Common.Currency;
    var released : Bool;
    var winner : ?Common.UserId;
  };

  public func createEscrowRecord(
    gameId : Common.GameId,
    stakeAmount : Nat,
    currency : Common.Currency,
  ) : EscrowRecord {
    {
      gameId;
      var lockedPlayers = [];
      stakeAmount;
      currency;
      var released = false;
      var winner = null;
    }
  };

  public func lockStake(self : EscrowRecord, player : Common.UserId) {
    let alreadyLocked = self.lockedPlayers.find(func(p : Common.UserId) : Bool {
      Principal.equal(p, player)
    });
    switch alreadyLocked {
      case null {
        self.lockedPlayers := self.lockedPlayers.concat([player])
      };
      case _ {}
    }
  };

  public func releaseToWinner(self : EscrowRecord, winner : Common.UserId) {
    self.winner := ?winner;
    self.released := true
  };

  public func totalPot(self : EscrowRecord) : Nat {
    self.lockedPlayers.size() * self.stakeAmount
  };
};
