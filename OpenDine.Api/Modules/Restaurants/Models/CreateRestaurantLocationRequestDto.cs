using System.ComponentModel.DataAnnotations;

namespace OpenDine.Api.Modules.Restaurants.Models
{
    public record CreateRestaurantLocationRequestDto
    {
        [Range(1, int.MaxValue)]
        public int RestaurantId { get; set; }
        [Required]
        public required string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        [Required]
        public string AddressLine1 { get; set; } = string.Empty;
        public string AddressLine2 { get; set; } = string.Empty;
        [Required]
        public string City { get; set; } = string.Empty;
        [Required]
        public string State { get; set; } = string.Empty;
        [Required]
        public string ZipCode { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string WebsiteUrl { get; set; } = string.Empty;
    }
}