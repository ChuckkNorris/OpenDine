using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OpenDine.Api.Modules.Common.Entities
{
    public class MenuItem : BaseEntity
    {
        [Key]
        public int MenuItemId { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; } = string.Empty;

        [StringLength(150)]
        public string Description { get; set; } = string.Empty;

        [Precision(19, 4)]
        public decimal Price { get; set; }

        [ForeignKey(nameof(MenuId))]
        public int MenuId { get; set; }
        public Menu Menu { get; set; } = null!;
    }
}
