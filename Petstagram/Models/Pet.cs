namespace Petstagram.Models;
using System.ComponentModel.DataAnnotations;
public class Pet
{
    [Required(ErrorMessage = "is required.")]
    public string Name { get; set; }

    [Required(ErrorMessage = "is required.")]
    [NoDragonsOrUnicornsAllowed]
    [Display(Name = "Pet Type")]
    [MinLength(3)]
    public string Type { get; set; }

    [Required(ErrorMessage = "is required.")]
    [Range(0, 120, ErrorMessage = "must be between 0 & 120 years old.")]
    public int? Age { get; set; }

    public string? Color { get; set; }
}


// Create a class that inherits from ValidationAttribute
public class NoDragonsOrUnicornsAllowedAttribute : ValidationAttribute
{    
    // Call upon the protected IsValid method
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)    
    {   
        // Though we have Required as a validation, sometimes we make it here anyways
    	// In which case we must first verify the value is not null before we proceed
        if (value == null)
        {
            return new ValidationResult("Type is required.");
        }
        
        // We are expecting the value coming in to be a string
        // so we need to do a bit of type casting to our object
        // Strings work similarly to arrays under the hood 
        // so we can grab the first letter using its index   
        // If we discover that our pet is of type dragon...  
        if (((string)value).ToLower() == "dragon")
        {        
            // we return an error message in ValidationResult we want to render    
            return new ValidationResult("No dragons are allowed on our website!");   
        } 
        else if(((string)value).ToLower() == "unicorn")
        {
            return new ValidationResult("No unicorns are allowed on our website!");   
        }  
        else 
        {   
            // Otherwise, we were successful and can report our success  
            return ValidationResult.Success;  
        }  
    }
}
