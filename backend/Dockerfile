# Imagem da API. Build: docker build -t zapotech-api backend/
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY Directory.Build.props global.json Zapotech.slnx ./
COPY src/Zapotech.Api/Zapotech.Api.csproj src/Zapotech.Api/
COPY src/Zapotech.Dominio/Zapotech.Dominio.csproj src/Zapotech.Dominio/
COPY src/Zapotech.Infra/Zapotech.Infra.csproj src/Zapotech.Infra/
RUN dotnet restore src/Zapotech.Api/Zapotech.Api.csproj
COPY src/ src/
RUN dotnet publish src/Zapotech.Api/Zapotech.Api.csproj -c Release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
ENV ASPNETCORE_HTTP_PORTS=8080 \
    ASPNETCORE_ENVIRONMENT=Producao
EXPOSE 8080
COPY --from=build /app .
USER $APP_UID
ENTRYPOINT ["dotnet", "Zapotech.Api.dll"]
