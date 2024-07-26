
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OpenDine.Api.Modules.Common.Controllers;
using OpenDine.Api.Modules.Common.Entities;
using OpenDine.Api.Modules.Menus.Models;
using OpenDine.Api.Modules.Restaurants.Models;
using System.Net;

namespace OpenDine.Api.Modules.Restaurants
{
    [ApiController]
    [Route("api/[controller]")]
    public class RestaurantsController : OpenDineController
    {
        private readonly RestaurantsService _restaurantsService;

        public RestaurantsController(RestaurantsService restaurantsService)
        {
            this._restaurantsService = restaurantsService;
        }

        [HttpPost]
        public async Task<ActionResult<CreateRestaurantResponseDto>> CreateRestaurant(CreateRestaurantRequestDto createRestaurantRequest)
        {
            var restaurant = await _restaurantsService.CreateRestaurant(createRestaurantRequest);
            return StatusCode(StatusCodes.Status201Created, new CreateRestaurantResponseDto(restaurant.RestaurantId));
        }

        [HttpGet]
        public List<Restaurant> GetAllRestaurants()
        {
            return _context.Restaurants.ToList();
        }
    }
}
