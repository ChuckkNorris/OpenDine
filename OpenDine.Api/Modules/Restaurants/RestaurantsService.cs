using Microsoft.IdentityModel.Tokens;
using OpenDine.Api.Modules.Common.Entities;
using OpenDine.Api.Modules.Common.Services;
using OpenDine.Api.Modules.Restaurants.Models;

namespace OpenDine.Api.Modules.Restaurants
{
    [TransientService]
    public class RestaurantsService
    {
        private readonly RestaurantsRepository _repo;

        public RestaurantsService(RestaurantsRepository context)
        {
            this._repo = context;
        }

        public async Task<RestaurantDto> CreateRestaurant(CreateRestaurantRequestDto request)
        {
            var restaurant = await _repo.CreateRestaurant(request);
            return restaurant.ToRestaurantDto();
        }

        public async Task<RestaurantLocationDto> CreateRestaurantLocation(CreateRestaurantLocationRequestDto request)
        {
            var restaurant = await _repo.CreateRestaurantLocation(request);
            return restaurant.ToRestaurantLocationDto();
        }

        public async Task<RestaurantDto> GetRestaurant(int restaurantId)
        {
            var restaurant = await _repo.GetRestaurantWithLocationsAsync(restaurantId);
            return restaurant.ToRestaurantDto();
        }
    }
}
