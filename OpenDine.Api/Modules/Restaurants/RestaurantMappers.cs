using OpenDine.Api.Modules.Common.Entities;
using OpenDine.Api.Modules.Restaurants.Models;

namespace OpenDine.Api.Modules.Restaurants
{
    public static class RestaurantMappers
    {
        // Restaurant
        public static RestaurantDto ToRestaurantDto(this Restaurant restaurant)
        {
            return new RestaurantDto
            {
                RestaurantId = restaurant.RestaurantId,
                Name = restaurant.Name,
                Description = restaurant.Description,
                RestaurantLocations = restaurant.RestaurantLocations
                    .Select(location => location.ToRestaurantLocationDto()).ToList(),
                CreatedOn = restaurant.CreatedOn,
                CreatedBy = restaurant.CreatedBy,
                ModifiedOn = restaurant.ModifiedOn,
                ModifiedBy = restaurant.ModifiedBy
            };
        }

        public static Restaurant ToRestaurant(this CreateRestaurantRequestDto createRestaurantDto)
        {
            return new Restaurant
            {
                Name = createRestaurantDto.Name,
                Description = createRestaurantDto.Description,
            };
        }
        
    }
}
