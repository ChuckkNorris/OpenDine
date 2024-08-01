using OpenDine.Api.Application.Exceptions;
using System.Globalization;
using System.Net;

namespace OpenDine.Api.Application.Middleware
{
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {

            try
            {
                // Call the next delegate/middleware in the pipeline (e.g. HTTP controller endpoint)
                await _next(context);
            }
            catch (NotFoundException ex)
            {
                context.Response.StatusCode = StatusCodes.Status404NotFound;
            }
            catch (Exception ex) when (ex is Exception)
            {
                context.Response.StatusCode = 500;
            }
        }
    }
}
