using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OpenDine.Api.Modules.Common.Entities;
using OpenDine.Api.Modules.Menus.Models;

namespace OpenDine.Api.Modules.Restaurants
{
    [ApiController]
    [Route("api/[controller]")]
    public class RestaurantsController
    {
        private readonly OpenDineContext _context;

        public RestaurantsController(OpenDineContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public List<Restaurant> GetAllRestaurants()
        {
            return _context.Restaurants.ToList();
        }
    }
}
