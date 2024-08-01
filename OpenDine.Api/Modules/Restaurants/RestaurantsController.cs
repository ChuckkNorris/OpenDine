
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OpenDine.Api.Application.Authorization;
using OpenDine.Api.Application.Controllers;
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

        [HttpPost("locations/{restaurantLocationId}")]
        public async Task<ActionResult<CreateRestaurantResponseDto>> CreateRestaurantLocation(CreateRestaurantLocationRequestDto createRestaurantLocationRequest)
        {
            var restaurant = await _restaurantsService.CreateRestaurantLocation(createRestaurantLocationRequest);
            return StatusCode(StatusCodes.Status201Created, new CreateRestaurantLocationResponseDto(restaurant.RestaurantLocationId));
        }

        [HttpGet("{restaurantId}")]
        public async Task<ActionResult<RestaurantDto>> GetRestaurantById(int restaurantId)
        {
            var restaurant = await _restaurantsService.GetRestaurant(restaurantId);
            return Ok(restaurant);
        }
    }
}
