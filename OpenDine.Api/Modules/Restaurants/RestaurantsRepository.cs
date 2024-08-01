using Microsoft.EntityFrameworkCore;
using OpenDine.Api.Application.Exceptions;
using OpenDine.Api.Modules.Common.Entities;
using OpenDine.Api.Modules.Common.Services;
using OpenDine.Api.Modules.Restaurants.Models;

namespace OpenDine.Api.Modules.Restaurants
{
    [TransientService]
    public class RestaurantsRepository
    {
        private readonly OpenDineContext _context;

        public RestaurantsRepository(OpenDineContext context)
        {
            this._context = context;
        }

        public async Task<Restaurant> CreateRestaurant(CreateRestaurantRequestDto request)
        {
            var restaurant = request.ToRestaurant();
            _context.Restaurants.Add(restaurant);
            await _context.SaveChangesAsync();
            return restaurant;
        }

        public async Task<Restaurant> GetRestaurantWithLocationsAsync(int restaurantId)
        {
            return await _context.Restaurants
                .Include(restaurant => restaurant.RestaurantLocations)
                .FirstOrDefaultAsync(restaurant => restaurant.RestaurantId == restaurantId)
                ?? throw new NotFoundException();
        }

        internal async Task<RestaurantLocation> CreateRestaurantLocation(CreateRestaurantLocationRequestDto request)
        {
            var restaurantLocation = request.ToRestaurantLocation();
           
            _context.RestaurantLocations.Add(restaurantLocation);
            await _context.SaveChangesAsync();
            return restaurantLocation;
        }
    }
}
