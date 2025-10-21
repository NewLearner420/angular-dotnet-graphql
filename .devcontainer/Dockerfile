FROM mcr.microsoft.com/devcontainers/base:ubuntu

# Install Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Install .NET 8 SDK
RUN wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb \
    && dpkg -i packages-microsoft-prod.deb \
    && rm packages-microsoft-prod.deb \
    && apt-get update \
    && apt-get install -y dotnet-sdk-8.0

# Install Angular CLI globally
RUN npm install -g @angular/cli@19

# Install PostgreSQL client tools
RUN apt-get install -y postgresql-client

# Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/*