public class Lecture
{
    public string Topic { get; set; }
    public int Day { get; set; }
    public List<Student> StudentList { get; set; }

    public Lecture(string topic, int day, List<Student> studentList)
    {
        Topic = topic;
        Day = day;
        StudentList = studentList;
    }

    public void PrintAttendance()
    {
        Console.WriteLine($"Welcome to the day {Day} lecture on {Topic}");
        Console.WriteLine("Our attending students are:");
        string attendingStudents = "";
        foreach(Student student in StudentList)
        {
            attendingStudents += student.FullName() + "\n";
        }

        Console.WriteLine(attendingStudents);
    }
}