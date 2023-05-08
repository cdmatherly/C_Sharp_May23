public class Student : Person
{
    public string CurrentStack { get; set; }

    public Student(string firstName, string lastName, string currentStack) : base(firstName, lastName)
    {
        CurrentStack = currentStack;
    }
}