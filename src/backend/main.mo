import Common "types/common";
import GameTypes "types/games";
import PlayerTypes "types/players";
import EscrowLib "lib/escrow";
import GamesApi "mixins/games-api";
import PlayersApi "mixins/players-api";
import Migration "migration";
import Map "mo:core/Map";

(with migration = Migration.run)
actor {
  let players = Map.empty<Common.UserId, PlayerTypes.Player>();
  let games = Map.empty<Common.GameId, GameTypes.Game>();
  let escrows = Map.empty<Common.GameId, EscrowLib.EscrowRecord>();

  include GamesApi(games, escrows);
  include PlayersApi(players);
};
