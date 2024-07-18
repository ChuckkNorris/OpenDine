using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace OpenDine.Api.Modules.Common.Entities
{
    [Index(nameof(Name))]
    public class Restaurant
    {
        [Key]
        public int RestaurantId { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
