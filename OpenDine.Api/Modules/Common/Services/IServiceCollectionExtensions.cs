namespace OpenDine.Api.Modules.Common.Services
{
    public static class IServiceCollectionExtensions
    {
        /// <summary>
        /// Registers any classes decorated with a service attribute to the DI container: [TransientService], [SingletonService], [ScopedService] 
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            return services.AddServicesOfType<TransientServiceAttribute>(ServiceLifetime.Transient)
                .AddServicesOfType<SingletonServiceAttribute>(ServiceLifetime.Singleton)
                .AddServicesOfType<SingletonServiceAttribute>(ServiceLifetime.Scoped);
        }

        private static IServiceCollection AddServicesOfType<T>(this IServiceCollection services, ServiceLifetime serviceLifetime) where T : Attribute
        {
            // Retrieve list of types that implement specified class/interface
            var serviceImplementations = GetAllImplementationsOfType<T>();

            // Add each service class to DI container according to specified lifetime attribute type
            foreach (var serviceType in serviceImplementations)
            {
                switch (serviceLifetime)
                {
                    case ServiceLifetime.Singleton:
                        services.AddSingleton(serviceType);
                        break;
                    case ServiceLifetime.Scoped:
                        services.AddScoped(serviceType);
                        break;
                    case ServiceLifetime.Transient:
                        services.AddTransient(serviceType);
                        break;
                    default:
                        services.AddTransient(serviceType);
                        break;
                }
            }
            return services;
        }

        private static IEnumerable<Type> GetAllImplementationsOfType<T>() where T : Attribute
        {
            // Finds all classes in the current (GroupProjectApi) assembly decorated with the specified attribute type
            return AppDomain.CurrentDomain.GetAssemblies().SelectMany(assembly => assembly.GetTypes().Where(type =>
                type.GetCustomAttributes(typeof(T), true).Length > 0
            ));
        }
    }
}
