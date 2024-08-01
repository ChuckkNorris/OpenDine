using System.ComponentModel.DataAnnotations;

namespace OpenDine.Api.Modules.Common.Entities
{
    public abstract class BaseEntity
    {
        [StringLength(50)]
        public string CreatedBy { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
        [StringLength(50)]
        public string ModifiedBy { get; set; } = string.Empty;
        public DateTime ModifiedOn { get; set; } = DateTime.UtcNow;
    }
}
