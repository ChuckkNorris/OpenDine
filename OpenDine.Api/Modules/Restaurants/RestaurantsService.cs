using Microsoft.IdentityModel.Tokens;
using OpenDine.Api.Modules.Common.Entities;
using OpenDine.Api.Modules.Common.Services;
using OpenDine.Api.Modules.Restaurants.Models;

namespace OpenDine.Api.Modules.Restaurants
{
    [TransientService]
    public class RestaurantsService
    {
        private readonly OpenDineContext _context;

        public RestaurantsService(OpenDineContext context)
        {
            this._context = context;
        }

        public async Task<RestaurantDto> CreateRestaurant(CreateRestaurantRequestDto request)
        {
            var restaurant = new Restaurant
            {
                Name = request.Name,
                Description = request.Description
            };
            _context.Restaurants.Add(restaurant);
            await _context.SaveChangesAsync();
            return restaurant.ToRestaurantDto();
        }
    }
}
