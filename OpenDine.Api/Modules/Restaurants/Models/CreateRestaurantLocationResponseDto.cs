namespace OpenDine.Api.Modules.Restaurants.Models
{
    public record CreateRestaurantLocationResponseDto
    {
        public CreateRestaurantLocationResponseDto(int restaurantLocationId)
        {
            RestaurantLocationId = restaurantLocationId;
        }
        public int RestaurantLocationId { get; set; }
    }
}
