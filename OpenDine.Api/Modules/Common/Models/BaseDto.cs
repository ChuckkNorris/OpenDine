namespace OpenDine.Api.Modules.Common.Models
{
    public abstract record BaseDto
    {
        public required DateTime CreatedOn { get; set; }
        public required string CreatedBy { get; set; } = string.Empty;
        public required DateTime ModifiedOn { get; set; }
        public required string ModifiedBy { get; set; } = string.Empty;
    }
}
