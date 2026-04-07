import Common "../types/common";
import PlayerTypes "../types/players";
import Array "mo:core/Array";

module {
  public func createPlayer(id : Common.UserId, startingCash : Nat) : PlayerTypes.Player {
    {
      id;
      var position = 0;
      var cash = startingCash;
      var inJail = false;
      var jailTurns = 0;
      var isBankrupt = false;
      var isReady = false;
    }
  };

  public func toView(self : PlayerTypes.Player) : PlayerTypes.PlayerView {
    {
      id = self.id;
      position = self.position;
      cash = self.cash;
      inJail = self.inJail;
      isBankrupt = self.isBankrupt;
      isReady = self.isReady;
    }
  };

  public func getActivePlayers(players : [PlayerTypes.Player]) : [PlayerTypes.Player] {
    players.filter(func(p : PlayerTypes.Player) : Bool { not p.isBankrupt })
  };

  public func isActive(self : PlayerTypes.Player) : Bool {
    not self.isBankrupt
  };

  // Returns true if successful, false if insufficient funds
  public func deductCash(self : PlayerTypes.Player, amount : Nat) : Bool {
    if (self.cash < amount) {
      false
    } else {
      self.cash -= amount;
      true
    }
  };

  public func addCash(self : PlayerTypes.Player, amount : Nat) {
    self.cash += amount
  };
};
