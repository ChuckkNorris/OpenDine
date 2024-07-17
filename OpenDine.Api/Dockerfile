FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /App
# Copy everything
COPY . ./
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
ARG ASPNETCORE_URLS=https://+:443,http://+:8080
EXPOSE 443
EXPOSE 80
EXPOSE 8080
WORKDIR /App
COPY --from=build-env /App/out .
ENTRYPOINT ["dotnet", "OpenDine.Api.dll"]