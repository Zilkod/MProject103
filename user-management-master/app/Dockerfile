# Base node 12 image
FROM node:12-alpine

# Select env
ARG MODE

WORKDIR /usr/src/app

# Copy package.json 
COPY ./package*.json ./

# Install dependencies; remove existing node_modules, install dependencies at a time
RUN npm ci

# Add extra tools
RUN apk add --no-cache nginx supervisor wget curl

# Nginx puts pid files
RUN mkdir -p /run/nginx

# Copy nginx config file
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

# Copy everything
COPY . ./

# Build project
RUN npm run build

# Rename env file based on Mode
RUN mv .env.${MODE} .env

# Run on port 5000
EXPOSE 5000/tcp

# Start supervisior
CMD /usr/bin/supervisord -c ./docker/supervisiord.conf

