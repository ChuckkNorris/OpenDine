using System.ComponentModel.DataAnnotations;

namespace OpenDine.Api.Modules.Restaurants.Models
{
    public record CreateRestaurantRequestDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
    }
}