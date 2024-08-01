using OpenDine.Api.Modules.Common.Models;

namespace OpenDine.Api.Modules.Restaurants.Models
{
    public record RestaurantLocationDto : BaseDto
    {
        public int RestaurantLocationId { get; set; }
        public required string Name { get; set; } = string.Empty;
        public required string Description { get; set; } = string.Empty;
        public required string AddressLine1 { get; set; } = string.Empty;
        public required string AddressLine2 { get; set; } = string.Empty;
        public required string City { get; set; } = string.Empty;
        public required string State { get; set; } = string.Empty;
        public required string ZipCode { get; set; } = string.Empty;
        public required string PhoneNumber { get; set; } = string.Empty;
        public required string Email { get; set; } = string.Empty;
        public required string WebsiteUrl { get; set; } = string.Empty;
    }
}
