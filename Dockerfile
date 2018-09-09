FROM node:9.11.1-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /vue-project

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]




# Stage 1 - Restoring & Compiling
FROM node:9.11.1-alpine
WORKDIR /source
RUN apk add --update nodejs nodejs-npm
COPY *.csproj .
RUN dotnet restore
COPY package.json .
RUN npm install
COPY . .
RUN dotnet publish -c Release -o /app/

# Stage 2 - Creating Image for compiled app
FROM microsoft/dotnet:2.1.1-aspnetcore-runtime-alpine3.7 as baseimage
RUN apk add --update nodejs nodejs-npm
WORKDIR /app
COPY --from=builder /app .
ENV ASPNETCORE_URLS=http://+:$port

# Run the application. REPLACE the name of dll with the name of the dll produced by your application
EXPOSE $port
CMD ["dotnet", "Vue2Spa.dll"]