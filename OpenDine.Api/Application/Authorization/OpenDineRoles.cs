namespace OpenDine.Api.Application.Authorization
{
    public class OpenDineRoles
    {
        // TODO: Need to configure authorization/roles to secure access to endpoints
        public const string GlobalAdministrator = "GlobalAdministrator";
        public const string RestaurantAdmin = "RestaurantAdmin";
        public const string RestaurantUser = "RestaurantUser";
        public const string RestaurantOwner = "RestaurantOwner";
        public const string RestaurantsCreate = "Restaurants.Create";
    }
}
