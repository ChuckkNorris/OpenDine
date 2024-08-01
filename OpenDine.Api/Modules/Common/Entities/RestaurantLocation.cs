using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OpenDine.Api.Modules.Common.Entities
{
    public class RestaurantLocation : BaseEntity
    {
        [Key]
        public int RestaurantLocationId { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; } = string.Empty;

        [StringLength(250)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string AddressLine1 { get; set; } = string.Empty;

        [StringLength(100)]
        public string AddressLine2 { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string City { get; set; } = string.Empty;

        [Required]
        [StringLength(2)]
        public string State { get; set; } = string.Empty;

        [Required]
        [StringLength(2)]
        public string Country { get; set; } = string.Empty;

        [Required]
        [StringLength(12)]
        public string ZipCode { get; set; } = string.Empty;

        [StringLength(42)]
        public string PhoneNumber { get; set; } = string.Empty;

        [StringLength(100)]
        public string Email { get; set; } = string.Empty;

        [StringLength(250)]
        public string WebsiteUrl { get; set; } = string.Empty;

        // FK to parent Restaurant
        [ForeignKey(nameof(Restaurant))]
        public int RestaurantId { get; set; }
        public Restaurant Restaurant { get; set; } = null!;

        // Child menus for restaurant location
        public ICollection<Menu> Menus{ get; set; } = new List<Menu>();
    }
}
