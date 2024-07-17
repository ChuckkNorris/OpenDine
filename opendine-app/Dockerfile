# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:22-alpine as app-build
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
RUN ls
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci --force
# --legacy-peer-deps
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)

FROM nginx:alpine

#!/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=app-build /app/build /usr/share/nginx/html

EXPOSE 3000 8080

ENTRYPOINT ["nginx", "-g", "daemon off;"]
# Start the app
# CMD [ "npx", "pm2", "serve" "build/" ] 
#npx pm2 serve build
# [ "npx", "pm2", "serve" "build/" ]