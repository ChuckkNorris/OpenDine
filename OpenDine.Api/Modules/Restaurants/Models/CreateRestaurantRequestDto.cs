namespace OpenDine.Api.Modules.Restaurants.Models
{
    public record CreateRestaurantRequestDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}