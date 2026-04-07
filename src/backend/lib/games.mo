import Common "../types/common";
import GameTypes "../types/games";
import PlayerTypes "../types/players";
import BoardLib "board";
import PlayersLib "players";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Int "mo:core/Int";

module {
  let STARTING_CASH : Nat = 1500;
  let JAIL_POSITION : Nat = 10;
  let GO_SALARY : Nat = 200;
  let JAIL_FEE : Nat = 50;

  public func createGame(
    id : Common.GameId,
    host : Common.UserId,
    args : GameTypes.CreateGameArgs,
    now : Common.Timestamp,
  ) : GameTypes.Game {
    {
      id;
      var host;
      var phase = #Lobby;
      var players = [];
      var turnIndex = 0;
      var stakeAmount = args.stakeAmount;
      var currency = args.currency;
      var properties = [];
      var events = [];
      var escrowLocked = false;
      var createdAt = now;
      var pendingBuySquare = null;
    }
  };

  public func toView(self : GameTypes.Game) : GameTypes.GameView {
    {
      id = self.id;
      host = self.host;
      phase = self.phase;
      players = self.players.map<PlayerTypes.Player, PlayerTypes.PlayerView>(
        func(p) { p.toView() }
      );
      turnIndex = self.turnIndex;
      stakeAmount = self.stakeAmount;
      currency = self.currency;
      properties = self.properties;
      events = self.events;
      escrowLocked = self.escrowLocked;
      pendingBuySquare = self.pendingBuySquare;
    }
  };

  // Returns true if player was added, false if game is full or player already in it
  public func addPlayer(self : GameTypes.Game, player : PlayerTypes.Player) : Bool {
    if (self.phase != #Lobby) return false;
    if (self.players.size() >= 4) return false;
    let alreadyIn = self.players.find(func(p : PlayerTypes.Player) : Bool {
      Principal.equal(p.id, player.id)
    });
    switch alreadyIn {
      case (?_) false;
      case null {
        self.players := self.players.concat([player]);
        true
      }
    }
  };

  public func setPlayerReady(self : GameTypes.Game, playerId : Common.UserId) : Bool {
    var found = false;
    self.players.forEach(func(p : PlayerTypes.Player) {
      if (Principal.equal(p.id, playerId)) {
        p.isReady := true;
        found := true
      }
    });
    found
  };

  public func canStart(self : GameTypes.Game) : Bool {
    if (self.players.size() < 2) return false;
    self.players.all(func(p : PlayerTypes.Player) : Bool { p.isReady })
  };

  public func startGame(self : GameTypes.Game) {
    self.phase := #Playing;
    self.escrowLocked := true
  };

  public func currentPlayer(self : GameTypes.Game) : ?PlayerTypes.Player {
    let active = PlayersLib.getActivePlayers(self.players);
    if (active.size() == 0) return null;
    let idx = self.turnIndex % active.size();
    ?active[idx]
  };

  public func advanceTurn(self : GameTypes.Game) {
    let active = PlayersLib.getActivePlayers(self.players);
    if (active.size() == 0) return;
    self.turnIndex := (self.turnIndex + 1) % active.size()
  };

  // Resolve what happens when a player lands on a square.
  // Returns (description, awaitingBuy) where awaitingBuy = true means turn must NOT advance yet.
  public func resolveSquare(
    self : GameTypes.Game,
    player : PlayerTypes.Player,
    square : Nat,
    now : Common.Timestamp,
  ) : (Text, Bool) {
    let sq = BoardLib.squareAt(square);
    switch sq {
      case (#Go) {
        player.addCash(GO_SALARY);
        appendEvent(self, {
          player = player.id;
          kind = #TaxPaid { amount = 0 };  // using as placeholder — no direct "collected GO" event kind
          timestamp = now
        });
        ("Landed on Go. Collected $200.", false)
      };
      case (#Property { name; price; rents = _; group = _ }) {
        switch (BoardLib.getOwnerOfSquare(square, self.properties)) {
          case null {
            // Unowned — player must decide to buy or pass
            self.pendingBuySquare := ?square;
            ("Landed on " # name # ". You may buy it for $" # price.toText() # ".", true)
          };
          case (?owner) {
            if (Principal.equal(owner, player.id)) {
              ("Landed on your own property: " # name # ".", false)
            } else {
              // Pay rent
              let rent = BoardLib.calculateRent(square, self.properties, owner);
              let paid = player.deductCash(rent);
              // Find owner player object and add cash
              self.players.forEach(func(p : PlayerTypes.Player) {
                if (Principal.equal(p.id, owner)) {
                  p.addCash(rent)
                }
              });
              if (paid) {
                appendEvent(self, {
                  player = player.id;
                  kind = #RentPaid { from = player.id; to = owner; amount = rent };
                  timestamp = now
                });
                ("Paid $" # rent.toText() # " rent on " # name # ".", false)
              } else {
                // Player couldn't pay — bankruptcy
                checkBankruptcy(self, player);
                ("Could not pay rent on " # name # ". Bankrupt!", false)
              }
            }
          }
        }
      };
      case (#Railroad { name; price = _ }) {
        switch (BoardLib.getOwnerOfSquare(square, self.properties)) {
          case null {
            self.pendingBuySquare := ?square;
            ("Landed on " # name # ". You may buy it for $200.", true)
          };
          case (?owner) {
            if (Principal.equal(owner, player.id)) {
              ("Landed on your own railroad: " # name # ".", false)
            } else {
              let rent = BoardLib.calculateRent(square, self.properties, owner);
              let paid = player.deductCash(rent);
              self.players.forEach(func(p : PlayerTypes.Player) {
                if (Principal.equal(p.id, owner)) {
                  p.addCash(rent)
                }
              });
              if (paid) {
                appendEvent(self, {
                  player = player.id;
                  kind = #RentPaid { from = player.id; to = owner; amount = rent };
                  timestamp = now
                });
                ("Paid $" # rent.toText() # " railroad rent.", false)
              } else {
                checkBankruptcy(self, player);
                ("Could not pay railroad rent. Bankrupt!", false)
              }
            }
          }
        }
      };
      case (#Utility { name; price = _ }) {
        switch (BoardLib.getOwnerOfSquare(square, self.properties)) {
          case null {
            self.pendingBuySquare := ?square;
            ("Landed on " # name # ". You may buy it for $150.", true)
          };
          case (?owner) {
            if (Principal.equal(owner, player.id)) {
              ("Landed on your own utility: " # name # ".", false)
            } else {
              let rent = BoardLib.calculateRent(square, self.properties, owner);
              let paid = player.deductCash(rent);
              self.players.forEach(func(p : PlayerTypes.Player) {
                if (Principal.equal(p.id, owner)) {
                  p.addCash(rent)
                }
              });
              if (paid) {
                appendEvent(self, {
                  player = player.id;
                  kind = #RentPaid { from = player.id; to = owner; amount = rent };
                  timestamp = now
                });
                ("Paid $" # rent.toText() # " utility rent.", false)
              } else {
                checkBankruptcy(self, player);
                ("Could not pay utility rent. Bankrupt!", false)
              }
            }
          }
        }
      };
      case (#Tax { name; amount }) {
        let paid = player.deductCash(amount);
        if (paid) {
          appendEvent(self, {
            player = player.id;
            kind = #TaxPaid { amount };
            timestamp = now
          });
          ("Paid " # name # ": $" # amount.toText() # ".", false)
        } else {
          checkBankruptcy(self, player);
          ("Could not pay " # name # ". Bankrupt!", false)
        }
      };
      case (#GoToJail) {
        player.position := JAIL_POSITION;
        player.inJail := true;
        player.jailTurns := 0;
        appendEvent(self, {
          player = player.id;
          kind = #SentToJail;
          timestamp = now
        });
        ("Go to Jail!", false)
      };
      case (#Jail) {
        ("Just visiting jail.", false)
      };
      case (#FreeParking) {
        ("Free Parking. Nothing happens.", false)
      };
      case (#CommunityChest) {
        ("Community Chest. (Cards not yet implemented.)", false)
      };
      case (#Chance) {
        ("Chance. (Cards not yet implemented.)", false)
      };
    }
  };

  // Returns true if property was successfully purchased
  public func buyProperty(
    self : GameTypes.Game,
    buyer : Common.UserId,
    square : Nat,
  ) : Bool {
    // Check not already owned
    switch (BoardLib.getOwnerOfSquare(square, self.properties)) {
      case (?_) return false;
      case null {}
    };
    // Get price
    let sq = BoardLib.squareAt(square);
    let price : Nat = switch sq {
      case (#Property { price; name = _; rents = _; group = _ }) price;
      case (#Railroad { price; name = _ }) price;
      case (#Utility { price; name = _ }) price;
      case _ return false
    };
    // Find buyer and deduct cash
    var bought = false;
    self.players.forEach(func(p : PlayerTypes.Player) {
      if (Principal.equal(p.id, buyer) and not bought) {
        if (p.deductCash(price)) {
          self.properties := self.properties.concat([{ square; owner = buyer }]);
          bought := true
        }
      }
    });
    bought
  };

  public func checkBankruptcy(self : GameTypes.Game, player : PlayerTypes.Player) {
    player.isBankrupt := true
  };

  public func checkWinner(self : GameTypes.Game) : ?Common.UserId {
    let active = PlayersLib.getActivePlayers(self.players);
    if (active.size() == 1) {
      ?active[0].id
    } else {
      null
    }
  };

  public func appendEvent(self : GameTypes.Game, event : Common.GameEvent) {
    self.events := self.events.concat([event])
  };

  public func generateGameId(caller : Common.UserId, now : Common.Timestamp) : Common.GameId {
    caller.toText() # "-" # now.toText()
  };
};
