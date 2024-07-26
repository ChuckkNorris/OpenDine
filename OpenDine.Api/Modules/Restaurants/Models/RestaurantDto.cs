namespace OpenDine.Api.Modules.Restaurants.Models
{
    public record RestaurantDto
    {
        public int RestaurantId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}