Console.WriteLine("Updated console wrl");

int SomeNum = 1;
string MyString = "The answer is 42";

//this will error out, b/c myString can ONLY store strings
// myString = someNum;

void PrintDivisibleNumbers(int start = 1, int inclusiveEnd = 100)
{
    for(int i = start; i <= inclusiveEnd; i++)
    {
        bool isDivisbleBy3 = i % 3 == 0;
        bool isDivisbleBy5 = i % 5 == 0;
        bool isDivisibleBy3And5 = isDivisbleBy3 && isDivisbleBy5;
        if(isDivisibleBy3And5)
        {
            Console.WriteLine("FizzBuzz");
        } 
        else if (isDivisbleBy5)
        {
            Console.WriteLine("Buzz");
        } 
        else if (isDivisbleBy3)
        {
            Console.WriteLine("Fizz");
        }
        else
        {
            Console.WriteLine(i);
        }
    }
}

List<string> Names = new List<string>()
{
    "Joe", "Spencer", "Chase", "Minh", "Evan", "Danielle", "Kirstie"
};

Names.Add("Max");

List<string> FilterToLongNames(List<string> names, int nameLength = 5)
{
    List<string> longNames = new List<string>();

    foreach (string name in names)
    {
        if(name.Length >= nameLength)
        {
            longNames.Add(name);
        }
    }

    return longNames;
}

PrintDivisibleNumbers();
Console.WriteLine("========================================");
// PrintDivisibleNumbers(50);
// Console.WriteLine("========================================");
// PrintDivisibleNumbers(50, 150);

Console.WriteLine(String.Join(", ", Names));
Console.WriteLine("========================================");
List<string> namesOver5Chars = FilterToLongNames(Names);
List<string> namesOver4Chars = FilterToLongNames(Names, 4);
Console.WriteLine(String.Join(", ", namesOver5Chars));
Console.WriteLine("========================================");
Console.WriteLine(String.Join(", ", namesOver4Chars));


Console.WriteLine();

Console.WriteLine();