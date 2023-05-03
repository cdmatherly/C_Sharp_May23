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
    public IActionResult AddPet(string Name, string Type, int Age, string Color)
    {
        if(Type == "dolphin")
        {
            ViewBag.SecretMessage = "You picked the secret pet type! Congrats!!!!";
            return View("Result");
        }
        Console.WriteLine($"{Name} is a(n) {Age} year old {Type} with {Color} hair");
        return Redirect("/result");
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
