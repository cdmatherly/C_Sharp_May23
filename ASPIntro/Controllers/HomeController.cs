using Microsoft.AspNetCore.Mvc;

// Inherit from an abstract base controller so our controllers inherit
// helpful methods for handling the HTTP request response cycle.
public class HomeController : Controller
{
    [HttpGet("")]
    public ViewResult Index()
    {
        return View("Index");
    }

    [HttpGet("/videos")]
    public ViewResult Videos()
    {
        // These ids are from the end of youtube video URLs
        List<string> youtubeVideoIds = new List<string>
        {
        "yT3_vLQ3jbM", "fbqHK8i-HdA", "CUe2ymg1RHs", "-rEIOkGCbo8", "KYgZPphIKQY", "GPdGeLAprdg", "eg9_ymCEAF8", "nHkUMkUFuBc", "QTwcvNdMFMI", "j6YK-qgt_TI", "Wvjsgb2nB4o", "GcKkiRl9_qE", "6avJHaC3C2U", "_mZBa3sqTrI"
        };
        /*
        Each controller method / 'action' has it's own ViewBag that is
        SEPARATE, the data is not shared between them.

        The ViewBag properties are automatically available in the View
        that is returned from this method.
        */
        
        ViewBag.VideoIds = youtubeVideoIds;
        ViewBag.Title = "Videos Page";
        return View("Videos");
    }

    // attribute, http type & the route URL
    [HttpGet("/helloMessage")] 
    // the function that runs when the user makes the above request
    public string HelloMessage()        
    {            
        // response to the request
    	return "Hello World from our HomeController!";        
    }
}