# OpenDine
Example application demonstrating usage of .NET Core Web API, React, Docker, Docker Compose, and Kubernetes

## Application Description
- opendine-app - React application which allows users to order food
- OpenDine.Api - A .NET Core Web API which provides API endpoints for opendine-app

## Running Applications in Docker
Docker is a software platform that simplifies the process of building, running, managing, and distributing applications by virtualizing the operating system of the host computer. Docker compiles the applications, creates an image of the compiled code, and runs the image within a container in a standard, repeatable way.

### Docker Pre-Requisites
1. Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
    > NOTE: Docker Desktop can ONLY be used for education and training purposes, as it requires a license for commercial use at large organizations. Check with your leadership before utilzing Docker Desktop for a client project. Another option is [Podman](https://podman.io/)
2. Download and install [.NET 8](https://dotnet.microsoft.com/en-us/download)
    > NOTE: Since we're using Docker, we are only installing .NET to scaffold the database schema using Entity Framework tooling
3. Download and install [Azure Data Studio](https://azure.microsoft.com/en-us/products/data-studio)

### ASP.NET Core Pre-Requisites
1. Reference [this documentation](https://learn.microsoft.com/en-us/aspnet/core/security/docker-compose-https?view=aspnetcore-8.0) to generate a development certificate to enable SSL for .NET Core Web API running in Docker container
1. Run one of the following commands to generate the development certificate
  - Windows/PowerShell
    ```
    dotnet dev-certs https -ep "$env:USERPROFILE\.aspnet\https\aspnetapp.pfx"  -p "Cobra1234"
    dotnet dev-certs https --trust
    ```
  - Mac/Linux
    ```
    dotnet dev-certs https -ep ${HOME}/.aspnet/https/aspnetapp.pfx -p "Cobra1234"
    dotnet dev-certs https --trust
    ```

### Running Docker (Docker Engine)
The steps in this section are to manually start the Docker Engine in case of a manual install without Docker Desktop
1. Reference [these instructions](https://www.paulsblog.dev/how-to-install-docker-without-docker-desktop-on-windows/) to manually install the Docker Engine and Portainer to utilize Docker without Docker Desktop
2. Once the Docker is installed in WSL2, run:
    ```
    wsl sudo service docker start
    ```
3. Verify Docker is running:
    ```
    wsl service docker status
    ```

### Running Applications in Docker
1. Open a terminal and navigate (cd) to the `example-apps/` directory
    ```
    cd /my/path/to/example-apps
    ```
2. Setup and run the applications using Docker Compose
    ```
    docker compose up
    ```
    > This will setup and run the Superhero DB (Azure SQL Edge), the Superhero.Api, and the superhero-app locally
3. After that completes, press `CTRL+C` to stop them; we need to set up the DB on the SQL Server instance that was created
4. Open Azure Data Studio and create a "New Connection" with the following details, then click Connect:
    - Connection String:
      - `Server=tcp:127.0.0.1,1433;Database=OpendineDb;User Id=sa;Password=Cobra1234;TrustServerCertificate=yes;`
        > NOTE: You may be able to use `localhost` instead of `127.0.0.1` depending on how Docker is installed (e.g. WSL2 w/ Docker Engine only vs. Docker Desktop)
    - Manual Connection:
      - Connection type: Microsoft SQL Server
      - Server: tcp:127.0.0.1,1433
      - User name: sa
      - Password: Cobra1234
      - Database: Master or default (whichever is available)
      - Name: OpendineDb Local
5. In the connections pane, right-click the SuperheroDb_Local connection and click "New Query"
6. Create the SuperheroDb database by typing the following, then click "Run":
    ```
    CREATE DATABASE SuperheroDb;
    ```
7. Install the [.NET Entity Framework Core CLI](https://learn.microsoft.com/en-us/ef/core/cli/dotnet) tool
    ```
    dotnet tool install --global dotnet-ef
    ```
8. CD into the `Opendine.Api/` directory and scaffold the code-first SuperheroDB schema:
    ```
    dotnet ef database update
    ```
9. From the `example-apps/` directory, run `docker compose up`
    - Access the React app from `http://localhost:3000`
    - API docs can be accessed from `https://localhost:5001/swagger`


### TODOS
1. Automate creation of SuperheroDb after SQL server is running initially
2. Automate the EF Core DB schema migration (dotnet ef database update)
3. Automate generation of .NET Dev SSL cert
    https://learn.microsoft.com/en-us/aspnet/core/security/docker-compose-https?view=aspnetcore-7.0