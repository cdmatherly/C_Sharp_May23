List<int> numbers = new List<int>()
{
  5, 15, 20, 0, 1, 3, 25
};

List<int> numsAboveTen = numbers.Where(number => number > 10).ToList();
// Console.WriteLine(String.Join(", ", numbers));
// Console.WriteLine("======================");
// Console.WriteLine(String.Join(", ", numsAboveTen));

List<string> names = new List<string>()
{
  "Neil", "Mark", "Lauren", "Jake", "Adam", "Garrett", "Max"
};

// int minNameLength = names.Min(name => name.Length);
// Console.WriteLine(minNameLength);

List<VideoGame> allGames = new List<VideoGame>()
{
    new VideoGame {Title="Blade & Sorcery", Studio="WarpFrog", Rating="Mature", Price=19.99, Platform="Oculus"}, 
    new VideoGame {Title="Fallout 4", Studio="Bethesda", Rating="M", Price=19.99, Platform="PC"},
    new VideoGame {Title="Red Dead Redemption 2", Studio="Rockstar", Rating="M", Price=59.99, Platform="Steam"},
    new VideoGame {Title="Baldur Gate 3", Studio="Larian", Rating="M", Price=59.99, Platform="PC, Mac"},
    new VideoGame {Title="Star Wars Jedi: Survivor", Studio="Respawn", Rating="T", Price=69.99, Platform="PS5, XBOX Series S/X, PC"},
    new VideoGame {Title="Furi", Studio="The Game Bakers", Rating="M", Price=20.00, Platform="PS4"},
    new VideoGame {Title="Maplestory", Studio="Nexon", Rating="E", Price=0, Platform="PC"},
    new VideoGame {Title="Hogwarts Legacy", Studio="Avalanche", Rating="T", Price=59.99, Platform="All"}, 
    new VideoGame {Title="Shadow of the Colossus", Studio="Team Ico", Rating="T", Price=9.99, Platform="PS2, GameCastPC"},
    new VideoGame("Apex Legends", "Riot", "E", 0, "Xbox"),
    new VideoGame("The Last of Us", "Naughty Dog", "M", 39.99, "PlayStation"),
    new VideoGame("Untitled Goose Game", "House House", "E", 29.99, "PC"),
    new VideoGame("Super Mario Bros.", "Nintendo", "E", 49.99, "SNES"),
    new VideoGame("Elden Ring", "FromSoftware", "M", 59.99, "PC"),
    new VideoGame("World of Warcraft", "Blizzard", "E", 49.99, "PC"),
    new VideoGame("Overwatch 2", "Blizzard", "T", 0, "PC"),
    new VideoGame {Title="resident evil 5", Studio="Capcom", Rating="M", Price=19.99, Platform="cross-platform"}, 
    new VideoGame {Title="God of War: Ragnarok:", Studio="Santa Monica", Rating="M", Price=59.99, Platform="PS5"}
};

// We want to use FirstOrDefault rather than First because if there isn't a matching element
// our server will crash when we use .First, whereas .FirstOrDefault will simply return null

// VideoGame selectedGame = allGames.First(game => game.Title == "Elden Rin");
VideoGame? selectedGame = allGames.FirstOrDefault(game => game.Title == "Elden Ring");
Console.WriteLine("Selected Game: " + selectedGame);

selectedGame = allGames.FirstOrDefault(game => game.Title == "abc");
Console.WriteLine("Selected Game: " + selectedGame);

// You can do the .Min query separately, as well as within the .FirstOrDefault's predicate
double minPrice = allGames.Min(game => game.Price);
VideoGame? cheapestGame = allGames.FirstOrDefault(game => game.Price == minPrice);
Console.WriteLine("Cheapest Game (Separate Queries): " + cheapestGame);

VideoGame? cheapestGame2 = allGames.FirstOrDefault(game => game.Price == allGames.Min(game => game.Price));
Console.WriteLine("Cheapest Game (Combined Query): " + cheapestGame2);

// Can use the .Any query to return a boolean based on the condition in our LINQ predicate
bool isAnyGameFree = allGames.Any(game => game.Price == 0);
Console.WriteLine($"Is any game free? {isAnyGameFree}");

List<VideoGame> orderedGames = allGames.OrderBy(game => game.Title).ToList();
PrintEach(orderedGames);

// finding all games created by Blizzard
List<VideoGame> filteredGames = allGames.Where(game => game.Studio == "Blizzard").ToList();
Console.WriteLine("=====================");
PrintEach(filteredGames);

// finding all games rated M & cost < $20
filteredGames = allGames.Where(game => game.Rating.StartsWith("M") && game.Price < 20).ToList();
Console.WriteLine("=====================");
PrintEach(filteredGames);

// finding all PC games
filteredGames = allGames.Where(game => game.Platform.Contains("PC")).ToList();
Console.WriteLine("=====================");
PrintEach(filteredGames);

// using the .Select method allows you to pull out a single (or multiple specific) fields
// rather than the whole object
List<double> selected = allGames.Where(game => game.Price > 35).Select(game => game.Price).ToList();
Console.WriteLine("=====================");
foreach(double gamePrice in selected)
{
    Console.WriteLine(gamePrice);
}

// the order that we put our LINQ statements can affect what our parameters in those LINQ queries are
List<double> selected2 = allGames.Select(game => game.Price).Where(price => price > 35).ToList();
Console.WriteLine("=====================");
foreach(double gamePrice in selected)
{
    Console.WriteLine(gamePrice);
}

void PrintEach(List<VideoGame> games)
{
    foreach(VideoGame game in games)
    {
        Console.WriteLine(game.Title);
    }
}