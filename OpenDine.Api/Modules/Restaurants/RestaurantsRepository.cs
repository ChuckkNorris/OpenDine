using Microsoft.EntityFrameworkCore;
using OpenDine.Api.Application.Exceptions;
using OpenDine.Api.Modules.Common.Entities;
using OpenDine.Api.Modules.Common.Services;
using OpenDine.Api.Modules.Restaurants.Models;
using System.Security.Claims;

namespace OpenDine.Api.Modules.Restaurants
{
    [TransientService]
    public class RestaurantsRepository
    {
        private readonly OpenDineContext _context;
        private readonly ClaimsPrincipal? _currentUser; 

        public RestaurantsRepository(OpenDineContext context, IHttpContextAccessor contextAccessor)
        {
            this._context = context;
            _currentUser = contextAccessor?.HttpContext?.User;
        }

        public async Task<Restaurant> CreateRestaurantAsync(CreateRestaurantRequestDto request)
        {
            var currentUserId = _currentUser?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var restaurant = request.ToRestaurant();
            _context.Restaurants.Add(restaurant);
            await _context.SaveChangesAsync();
            return restaurant;
        }

        public async Task<IEnumerable<Restaurant>> GetAllRestaurantsAsync()
        {
            return await _context.Restaurants
                .Include(restaurant => restaurant.RestaurantLocations)
                .ToListAsync()
                ?? throw new NotFoundException();
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
