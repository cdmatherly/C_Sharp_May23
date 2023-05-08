/*
We can still use the parameterless constructor since we added it back after
overriding it with the our other constructor.
*/
Person personOne = new Person()
{
    FirstName = "Alex",
    LastName = "Miller"
};

Person personTwo = new Person("Bobothy", "Bobbert");
Student studentOne = new Student("Sbeve", "Bobbert", "C#");
Student morty = new Student("Morty", "Smith", "C#");
Student summer = new Student("Summer", "Smith", "C#");
Student rick = new Student("Rick", "Sanchez", "C#");

List<Student> cSharpStudents = new List<Student>()
{
    morty,
    summer,
    rick,
    studentOne
};

Lecture oopLecture = new Lecture("OOP Intro", 2, cSharpStudents);

// Console.WriteLine(personOne.FullName());
// Console.WriteLine(personTwo.FullName());
// Console.WriteLine(studentOne.FullName());

oopLecture.PrintAttendance();