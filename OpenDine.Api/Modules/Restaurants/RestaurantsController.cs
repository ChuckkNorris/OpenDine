
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
        private readonly OpenDineContext _context;

        public RestaurantsController(OpenDineContext context)
        {
            this._context = context;
        }

        [HttpPost]
        public ActionResult<CreateRestaurantResponseDto> CreateRestaurant()
        {
            return StatusCode(StatusCodes.Status201Created, new CreateRestaurantResponseDto());
        }

        [HttpGet]
        public List<Restaurant> GetAllRestaurants()
        {
            return _context.Restaurants.ToList();
        }
    }
}
