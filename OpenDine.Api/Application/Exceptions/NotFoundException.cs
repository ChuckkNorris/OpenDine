namespace OpenDine.Api.Application.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string message = "Entity does not exist or you do not have permission to access it") : base(message)
        {
                
        }
    }
}
