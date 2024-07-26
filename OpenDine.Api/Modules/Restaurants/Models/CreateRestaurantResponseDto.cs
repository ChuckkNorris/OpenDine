namespace OpenDine.Api.Modules.Restaurants.Models
{
    public record CreateRestaurantResponseDto
    {
        public CreateRestaurantResponseDto(int restaurantId)
        {
            RestaurantId = restaurantId;
        }
        public int RestaurantId { get; set; }
    }
}
