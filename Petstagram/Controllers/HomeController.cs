using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Petstagram.Models;

namespace Petstagram.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    [HttpGet("")]
    public IActionResult Index()
    {
        return View();
    }

    [HttpGet("/result")]
    public ViewResult Result()
    {
        return View("Result");
    }

    [HttpPost("/addPet")]
    public IActionResult Create(Pet newPet)
    {
        if(!ModelState.IsValid)
        {
            return View("Index");
        }
  
        Console.WriteLine("Name: " + newPet.Name);
        Console.WriteLine("Type: " + newPet.Type);
        Console.WriteLine("Age: " + newPet.Age);
        Console.WriteLine("Color: " + newPet.Color);

        HttpContext.Session.SetString("PetName", newPet.Name);
        HttpContext.Session.SetString("PetType", newPet.Type);
        if(newPet.Color != null)
        {
            HttpContext.Session.SetString("PetColor", newPet.Color);
        }
        if(newPet.Age != null)
        {
            HttpContext.Session.SetInt32("PetAge", (int)newPet.Age);
        }

        string? sessionName = HttpContext.Session.GetString("PetName");
        int? sessionAge = HttpContext.Session.GetInt32("PetAge");

        Console.WriteLine(sessionName);
        Console.WriteLine(sessionAge);

        // we're not redirecting here b/c we're not working with a DB yet, typically this would
        // be a redirect
        return Redirect("ViewPet");
    }

    [HttpGet("/viewPet")]
    public IActionResult ViewPet()
    {
        return View("ViewPet");
    }

    [HttpPost("/clearSession")]
    public IActionResult ClearSession()
    {
        HttpContext.Session.Clear();
        return Redirect("/");
    }

    [HttpGet("/privacy")]
    public IActionResult Privacy()
    {
        return View();
    }

    [HttpGet("{**path}")]
    public RedirectResult CatchAll()
    {
        Console.WriteLine("This Page Doesn't Exist");
        return Redirect("/");
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
