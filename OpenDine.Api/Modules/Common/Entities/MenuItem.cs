using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OpenDine.Api.Modules.Common.Entities
{
    public class MenuItem
    {
        [Key]
        public int MenuItemId { get; set; }

        [ForeignKey(nameof(MenuId))]
        public int MenuId { get; set; }
        public Menu Menu { get; set; } = null!;
    }
}
