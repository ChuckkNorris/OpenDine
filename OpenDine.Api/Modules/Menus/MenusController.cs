using Microsoft.AspNetCore.Mvc;
using OpenDine.Api.Modules.Common.Controllers;
using OpenDine.Api.Modules.Menus.Models;

namespace OpenDine.Api.Modules.Menus
{
    [ApiController]
    [Route("api/[controller]")]
    public class MenusController : OpenDineController
    {
        [HttpGet]
        public TestMenuDto GetMenu()
        {
            return new TestMenuDto
            {
                LastUpdated = DateOnly.FromDateTime(DateTime.Now),
                Name = "My Menu"
            };
        }
    }
}
