using OpenDine.Api.Modules.Common.Models;

namespace OpenDine.Api.Modules.Restaurants.Models
{
    public record RestaurantDto: BaseDto
    {
        public int RestaurantId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<RestaurantLocationDto> RestaurantLocations { get; set; } = new List<RestaurantLocationDto>();
    }
}