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

        // we're not redirecting here b/c we're not working with a DB yet, typically this would
        // be a redirect
        return View("ViewPet", newPet);
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
