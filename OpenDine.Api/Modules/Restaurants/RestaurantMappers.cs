using OpenDine.Api.Modules.Common.Entities;
using OpenDine.Api.Modules.Restaurants.Models;

namespace OpenDine.Api.Modules.Restaurants
{
    public static class RestaurantMappers
    {
        public static RestaurantDto ToRestaurantDto(this Restaurant restaurant)
        {
            return new RestaurantDto
            {
                RestaurantId = restaurant.RestaurantId,
                Name = restaurant.Name,
                Description = restaurant.Description
            };
        }
    }
}
