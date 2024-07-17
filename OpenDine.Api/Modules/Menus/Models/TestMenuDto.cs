namespace OpenDine.Api.Modules.Menus.Models
{
    public record TestMenuDto
    {
        public string Name { get; set; } = string.Empty;
        public DateOnly LastUpdated { get; set; } = new DateOnly();
    }
}
