namespace OpenDine.Api.Modules.Common.Models
{
    /// <summary>
    /// Custom BaseDto record ineherited by all Entity Framework entities for tracking creation and modification information
    /// </summary>
    public abstract record BaseDto
    {
        public required DateTime CreatedOn { get; set; }
        public required string CreatedBy { get; set; } = string.Empty;
        public required DateTime ModifiedOn { get; set; }
        public required string ModifiedBy { get; set; } = string.Empty;
    }
}
