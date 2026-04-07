import Common "../types/common";
import PlayerTypes "../types/players";
import PlayersLib "../lib/players";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

mixin (
  players : Map.Map<Common.UserId, PlayerTypes.Player>,
) {
  // Register or fetch the calling player's profile
  public shared ({ caller }) func getOrCreatePlayer() : async PlayerTypes.PlayerView {
    switch (players.get(caller)) {
      case (?player) { player.toView() };
      case null {
        let newPlayer = PlayersLib.createPlayer(caller, 1500);
        players.add(caller, newPlayer);
        newPlayer.toView()
      }
    }
  };

  // Get a player's public info
  public query func getPlayer(playerId : Common.UserId) : async ?PlayerTypes.PlayerView {
    switch (players.get(playerId)) {
      case (?player) ?player.toView();
      case null null
    }
  };
};
