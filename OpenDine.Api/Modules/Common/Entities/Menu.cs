using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OpenDine.Api.Modules.Common.Entities
{
    public class Menu
    {
        [Key]
        public int MenuId { get; set; }
        [ForeignKey(nameof(RestaurantId))]
        public int RestaurantId { get; set; }
    }
}
