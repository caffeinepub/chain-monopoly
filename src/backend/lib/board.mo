import Common "../types/common";
import GameTypes "../types/games";
import Array "mo:core/Array";
import Principal "mo:core/Principal";

module {
  // Returns the full 40-square Monopoly board
  public func boardSquares() : [GameTypes.SquareKind] {
    [
      #Go,
      #Property { name = "Mediterranean Avenue"; price = 60; rents = [2, 10, 30, 90, 160, 250]; group = #Brown },
      #CommunityChest,
      #Property { name = "Baltic Avenue"; price = 60; rents = [4, 20, 60, 180, 320, 450]; group = #Brown },
      #Tax { name = "Income Tax"; amount = 200 },
      #Railroad { name = "Reading Railroad"; price = 200 },
      #Property { name = "Oriental Avenue"; price = 100; rents = [6, 30, 90, 270, 400, 550]; group = #LightBlue },
      #Chance,
      #Property { name = "Vermont Avenue"; price = 100; rents = [6, 30, 90, 270, 400, 550]; group = #LightBlue },
      #Property { name = "Connecticut Avenue"; price = 120; rents = [8, 40, 100, 300, 450, 600]; group = #LightBlue },
      #Jail,
      #Property { name = "St. Charles Place"; price = 140; rents = [10, 50, 150, 450, 625, 750]; group = #Pink },
      #Utility { name = "Electric Company"; price = 150 },
      #Property { name = "States Avenue"; price = 140; rents = [10, 50, 150, 450, 625, 750]; group = #Pink },
      #Property { name = "Virginia Avenue"; price = 160; rents = [12, 60, 180, 500, 700, 900]; group = #Pink },
      #Railroad { name = "Pennsylvania Railroad"; price = 200 },
      #Property { name = "St. James Place"; price = 180; rents = [14, 70, 200, 550, 750, 950]; group = #Orange },
      #CommunityChest,
      #Property { name = "Tennessee Avenue"; price = 180; rents = [14, 70, 200, 550, 750, 950]; group = #Orange },
      #Property { name = "New York Avenue"; price = 200; rents = [16, 80, 220, 600, 800, 1000]; group = #Orange },
      #FreeParking,
      #Property { name = "Kentucky Avenue"; price = 220; rents = [18, 90, 250, 700, 875, 1050]; group = #Red },
      #Chance,
      #Property { name = "Indiana Avenue"; price = 220; rents = [18, 90, 250, 700, 875, 1050]; group = #Red },
      #Property { name = "Illinois Avenue"; price = 240; rents = [20, 100, 300, 750, 925, 1100]; group = #Red },
      #Railroad { name = "B&O Railroad"; price = 200 },
      #Property { name = "Atlantic Avenue"; price = 260; rents = [22, 110, 330, 800, 975, 1150]; group = #Yellow },
      #Property { name = "Ventnor Avenue"; price = 260; rents = [22, 110, 330, 800, 975, 1150]; group = #Yellow },
      #Utility { name = "Water Works"; price = 150 },
      #Property { name = "Marvin Gardens"; price = 280; rents = [24, 120, 360, 850, 1025, 1200]; group = #Yellow },
      #GoToJail,
      #Property { name = "Pacific Avenue"; price = 300; rents = [26, 130, 390, 900, 1100, 1275]; group = #Green },
      #Property { name = "North Carolina Avenue"; price = 300; rents = [26, 130, 390, 900, 1100, 1275]; group = #Green },
      #CommunityChest,
      #Property { name = "Pennsylvania Avenue"; price = 320; rents = [28, 150, 450, 1000, 1200, 1400]; group = #Green },
      #Railroad { name = "Short Line Railroad"; price = 200 },
      #Chance,
      #Property { name = "Park Place"; price = 350; rents = [35, 175, 500, 1100, 1300, 1500]; group = #DarkBlue },
      #Tax { name = "Luxury Tax"; amount = 100 },
      #Property { name = "Boardwalk"; price = 400; rents = [50, 200, 600, 1400, 1700, 2000]; group = #DarkBlue },
    ]
  };

  public func squareAt(index : Nat) : GameTypes.SquareKind {
    let squares = boardSquares();
    squares[index % 40]
  };

  // Calculate rent owed based on owner's color group holdings
  public func calculateRent(
    square : Nat,
    properties : [GameTypes.PropertyOwnership],
    ownerPrincipal : Common.UserId,
  ) : Nat {
    let sq = squareAt(square);
    switch sq {
      case (#Property { rents; group }) {
        let owned = countOwnedInGroup(group, ownerPrincipal, properties);
        let total = groupSize(group);
        // If owner owns all in group, double base rent (index 0 is base, doubled when monopoly)
        if (owned >= total) {
          rents[0] * 2
        } else {
          rents[0]
        }
      };
      case (#Railroad _) {
        // Count how many railroads owner has: 1->25, 2->50, 3->100, 4->200
        let owned = countOwnedInGroup(#Railroad, ownerPrincipal, properties);
        if (owned == 1) 25
        else if (owned == 2) 50
        else if (owned == 3) 100
        else 200
      };
      case (#Utility _) {
        // Count utilities: 1->4x dice (approx 28), 2->10x dice (approx 70)
        let owned = countOwnedInGroup(#Utility, ownerPrincipal, properties);
        if (owned >= 2) 70 else 28
      };
      case _ { 0 }
    }
  };

  public func getOwnerOfSquare(
    square : Nat,
    properties : [GameTypes.PropertyOwnership],
  ) : ?Common.UserId {
    let found = properties.find(func(p : GameTypes.PropertyOwnership) : Bool {
      p.square == square
    });
    switch found {
      case (?p) ?p.owner;
      case null null
    }
  };

  public func countOwnedInGroup(
    group : GameTypes.ColorGroup,
    owner : Common.UserId,
    properties : [GameTypes.PropertyOwnership],
  ) : Nat {
    let squares = boardSquares();
    var count = 0;
    for (i in squares.keys()) {
      let sq = squares[i];
      let inGroup = switch sq {
        case (#Property { group = g }) { g == group };
        case (#Railroad _) { group == #Railroad };
        case (#Utility _) { group == #Utility };
        case _ { false }
      };
      if (inGroup) {
        switch (getOwnerOfSquare(i, properties)) {
          case (?o) { if (Principal.equal(o, owner)) { count += 1 } };
          case null {}
        }
      }
    };
    count
  };

  public func groupSize(group : GameTypes.ColorGroup) : Nat {
    switch group {
      case (#Brown) 2;
      case (#LightBlue) 3;
      case (#Pink) 3;
      case (#Orange) 3;
      case (#Red) 3;
      case (#Yellow) 3;
      case (#Green) 3;
      case (#DarkBlue) 2;
      case (#Railroad) 4;
      case (#Utility) 2;
    }
  };
};
