import Common "../types/common";
import GameTypes "../types/games";
import EscrowLib "../lib/escrow";
import GamesLib "../lib/games";
import PlayersLib "../lib/players";
import BoardLib "../lib/board";
import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Int "mo:core/Int";

mixin (
  games : Map.Map<Common.GameId, GameTypes.Game>,
  escrows : Map.Map<Common.GameId, EscrowLib.EscrowRecord>,
) {
  // Create a new game lobby
  public shared ({ caller }) func createGame(args : GameTypes.CreateGameArgs) : async GameTypes.GameView {
    let now = Time.now();
    let id = GamesLib.generateGameId(caller, now);
    let game = GamesLib.createGame(id, caller, args, now);
    // Add host as first player
    let hostPlayer = PlayersLib.createPlayer(caller, 1500);
    ignore game.addPlayer(hostPlayer);
    // Create escrow
    let escrow = EscrowLib.createEscrowRecord(id, args.stakeAmount, args.currency);
    escrow.lockStake(caller);
    games.add(id, game);
    escrows.add(id, escrow);
    game.appendEvent({
      player = caller;
      kind = #PlayerJoined { player = caller };
      timestamp = now
    });
    game.toView()
  };

  // Join an open game by ID
  public shared ({ caller }) func joinGame(gameId : Common.GameId) : async GameTypes.JoinGameResult {
    switch (games.get(gameId)) {
      case null { #Err("Game not found") };
      case (?game) {
        if (game.phase != #Lobby) return #Err("Game already started");
        let now = Time.now();
        let newPlayer = PlayersLib.createPlayer(caller, 1500);
        if (not game.addPlayer(newPlayer)) {
          return #Err("Could not join game (already in or full)")
        };
        switch (escrows.get(gameId)) {
          case (?escrow) { escrow.lockStake(caller) };
          case null {}
        };
        game.appendEvent({
          player = caller;
          kind = #PlayerJoined { player = caller };
          timestamp = now
        });
        #Ok(game.toView())
      }
    }
  };

  // Mark the calling player as ready; starts the game when all players are ready
  public shared ({ caller }) func setReady(gameId : Common.GameId) : async GameTypes.JoinGameResult {
    switch (games.get(gameId)) {
      case null { #Err("Game not found") };
      case (?game) {
        if (game.phase != #Lobby) return #Err("Game already started");
        ignore game.setPlayerReady(caller);
        let now = Time.now();
        if (game.canStart()) {
          game.startGame();
          game.appendEvent({
            player = caller;
            kind = #GameStarted;
            timestamp = now
          })
        };
        #Ok(game.toView())
      }
    }
  };

  // Roll dice for the current player's turn
  public shared ({ caller }) func rollDice(gameId : Common.GameId) : async GameTypes.RollResult {
    switch (games.get(gameId)) {
      case null { #Err("Game not found") };
      case (?game) {
        if (game.phase != #Playing) return #Err("Game is not in playing phase");
        switch (game.currentPlayer()) {
          case null { #Err("No active players") };
          case (?player) {
            if (not Principal.equal(player.id, caller)) {
              return #Err("Not your turn")
            };
            let now = Time.now();
            // Generate pseudo-random dice from current time
            let seed = Int.abs(now);
            let die1 = (seed % 6) + 1;
            let die2 = ((seed / 7) % 6) + 1;
            let roll = die1 + die2;

            // Handle jail
            if (player.inJail) {
              let isDoubles = die1 == die2;
              if (isDoubles) {
                player.inJail := false;
                player.jailTurns := 0
              } else if (player.jailTurns >= 2) {
                // Must pay to exit
                ignore player.deductCash(50);
                player.inJail := false;
                player.jailTurns := 0
              } else {
                player.jailTurns += 1;
                game.appendEvent({
                  player = caller;
                  kind = #Rolled { die1; die2 };
                  timestamp = now
                });
                game.advanceTurn();
                return #Ok({
                  die1;
                  die2;
                  newPosition = player.position;
                  event = "In jail. Turn " # player.jailTurns.toText() # " of 3."
                })
              }
            };

            let oldPosition = player.position;
            let newPos = (oldPosition + roll) % 40;

            // Collect $200 for passing Go
            if (newPos < oldPosition and oldPosition != 30) {
              player.addCash(200)
            };

            player.position := newPos;

            game.appendEvent({
              player = caller;
              kind = #Rolled { die1; die2 };
              timestamp = now
            });
            game.appendEvent({
              player = caller;
              kind = #Moved { from = oldPosition; to = newPos };
              timestamp = now
            });

            let (eventDesc, awaitingBuy) = game.resolveSquare(player, newPos, now);

            // Check for winner
            switch (game.checkWinner()) {
              case (?winner) {
                game.phase := #Finished;
                game.appendEvent({
                  player = winner;
                  kind = #GameWon { winner };
                  timestamp = now
                });
                switch (escrows.get(gameId)) {
                  case (?escrow) { escrow.releaseToWinner(winner) };
                  case null {}
                }
              };
              case null {}
            };

            // Only advance turn when no buy decision is pending.
            // If awaitingBuy, the turn advances after buyProperty or passProperty is called.
            if (not awaitingBuy) {
              game.advanceTurn()
            };

            #Ok({ die1; die2; newPosition = newPos; event = eventDesc })
          }
        }
      }
    }
  };

  // Buy the property on the square the caller currently stands on
  public shared ({ caller }) func buyProperty(gameId : Common.GameId) : async GameTypes.BuyPropertyResult {
    switch (games.get(gameId)) {
      case null { #Err("Game not found") };
      case (?game) {
        if (game.phase != #Playing) return #Err("Game is not in playing phase");
        // Guard: only the current player may buy
        switch (game.currentPlayer()) {
          case null { return #Err("No active players") };
          case (?current) {
            if (not Principal.equal(current.id, caller)) {
              return #Err("Not your turn")
            }
          }
        };
        // Guard: a buy decision must be pending
        let square = switch (game.pendingBuySquare) {
          case null { return #Err("No property purchase pending for your turn") };
          case (?sq) sq
        };
        if (game.buyProperty(caller, square)) {
          let now = Time.now();
          let sq = BoardLib.squareAt(square);
          let price : Nat = switch sq {
            case (#Property { price; name = _; rents = _; group = _ }) price;
            case (#Railroad { price; name = _ }) price;
            case (#Utility { price; name = _ }) price;
            case _ 0
          };
          game.pendingBuySquare := null;
          game.appendEvent({
            player = caller;
            kind = #PropertyBought { square; price };
            timestamp = now
          });
          game.advanceTurn();
          #Ok(game.toView())
        } else {
          #Err("Cannot buy this property (already owned, insufficient funds, or not a purchasable square)")
        }
      }
    }
  };

  // Decline to buy the pending property and advance the turn
  public shared ({ caller }) func passProperty(gameId : Common.GameId) : async GameTypes.JoinGameResult {
    switch (games.get(gameId)) {
      case null { #Err("Game not found") };
      case (?game) {
        if (game.phase != #Playing) return #Err("Game is not in playing phase");
        switch (game.currentPlayer()) {
          case null { return #Err("No active players") };
          case (?current) {
            if (not Principal.equal(current.id, caller)) {
              return #Err("Not your turn")
            }
          }
        };
        game.pendingBuySquare := null;
        game.advanceTurn();
        #Ok(game.toView())
      }
    }
  };

  // List all open (Lobby phase) games
  public query func listOpenGames() : async [GameTypes.GameView] {
    let result = List.empty<GameTypes.GameView>();
    for ((_, game) in games.entries()) {
      if (game.phase == #Lobby) {
        result.add(game.toView())
      }
    };
    result.toArray()
  };

  // Get the current state of a specific game
  public query func getGame(gameId : Common.GameId) : async ?GameTypes.GameView {
    switch (games.get(gameId)) {
      case null null;
      case (?game) ?game.toView()
    }
  };

  // Get recent events for a game
  public query func getEvents(gameId : Common.GameId, limit : Nat) : async [Common.GameEvent] {
    switch (games.get(gameId)) {
      case null [];
      case (?game) {
        let events = game.events;
        let total = events.size();
        if (limit == 0 or limit >= total) {
          events
        } else {
          let from : Int = total - limit;
          events.sliceToArray(from, total : Int)
        }
      }
    }
  };
};
