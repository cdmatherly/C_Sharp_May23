namespace Petstagram.Models;
using System.ComponentModel.DataAnnotations;
public class Pet
{
    [Required(ErrorMessage = "is required.")]
    public string Name { get; set; }

    [Required(ErrorMessage = "is required.")]
    [Display(Name = "Pet Type")]
    [MinLength(3)]
    public string Type { get; set; }

    [Required(ErrorMessage = "is required.")]
    [Range(0, 120, ErrorMessage = "must be between 0 & 120 years old.")]
    public int Age { get; set; }

    public string? Color { get; set; }
}