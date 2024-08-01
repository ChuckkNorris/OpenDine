using OpenDine.Api.Modules.Common.Entities;
using OpenDine.Api.Modules.Restaurants.Models;

namespace OpenDine.Api.Modules.Restaurants
{
    public static class RestaurantLocationMappers
    {
        public static RestaurantLocationDto ToRestaurantLocationDto(this RestaurantLocation location)
        {
            return new RestaurantLocationDto
            {
                RestaurantLocationId = location.RestaurantLocationId,
                Name = location.Name,
                Description = location.Description,
                AddressLine1 = location.AddressLine1,
                AddressLine2 = location.AddressLine2,
                City = location.City,
                State = location.State,
                ZipCode = location.ZipCode,
                PhoneNumber = location.PhoneNumber,
                Email = location.Email,
                WebsiteUrl = location.WebsiteUrl,
                CreatedOn = location.CreatedOn,
                CreatedBy = location.CreatedBy,
                ModifiedOn = location.ModifiedOn,
                ModifiedBy = location.ModifiedBy
            };
        }

        public static RestaurantLocation ToRestaurantLocation(this CreateRestaurantLocationRequestDto request)
        {
            return new RestaurantLocation
            {
                Name = request.Name,
                Description = request.Description,
                AddressLine1 = request.AddressLine1,
                AddressLine2 = request.AddressLine2,
                City = request.City,
                State = request.State,
                ZipCode = request.ZipCode,
                PhoneNumber = request.PhoneNumber,
                Email = request.Email,
                WebsiteUrl = request.WebsiteUrl,
            };
        }
    }
}
