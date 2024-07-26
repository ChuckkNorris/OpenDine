using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace OpenDine.Api.Modules.Common.Entities
{
    [Index(nameof(Name))]
    public class RestaurantMenu
    {
        [Key]
        public int RestaurantMenuId { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
