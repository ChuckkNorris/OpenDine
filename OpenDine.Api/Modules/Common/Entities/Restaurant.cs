using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OpenDine.Api.Modules.Common.Entities
{
    [Index(nameof(Name))]
    public class Restaurant : BaseEntity
    {
        [Key]
        public int RestaurantId { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; } = string.Empty;
        [StringLength(250)]
        public string Description { get; set; } = string.Empty;
        public ICollection<RestaurantLocation> RestaurantLocations { get; set; } = new List<RestaurantLocation>();
    }
}
