using Microsoft.IdentityModel.Tokens;
using OpenDine.Api.Modules.Common.Entities;

namespace OpenDine.Api.Modules.Restaurants
{
    public class RestaurantsService
    {
        private readonly OpenDineContext _context;

        public RestaurantsService(OpenDineContext context)
        {
            this._context = context;
        }

        public void CreateRestaurant()
        {

        }
    }
}
