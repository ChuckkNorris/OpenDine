using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OpenDine.Api.Modules.Common.Entities
{
    public class Menu : BaseEntity
    {
        [Key]
        public int MenuId { get; set; }
        public string Name { get; set; } = string.Empty;

        public ICollection<MenuItem> MenuItems { get; set; } = new List<MenuItem>();

        // FK to parent RestaurantLocation
        [ForeignKey(nameof(RestaurantLocation))]
        public int RestaurantLocationId { get; set; }
        public RestaurantLocation RestaurantLocation { get; set; } = null!;
    }
}
