FROM node:20-alpine3.18 AS builder

# Declare build time environment variables (if needed)
ARG MONGO_PASSWORD_ENV
ARG SITE_URL_ENV

# Set default values for environment variables (if needed)
ENV MONGO_PASSWORD=$MONGO_PASSWORD_ENV
ENV SITE_URL_ENV=$SITE_URL_ENV

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build && npm run satrt

# FROM nginx:alpine
# RUN rm -rf /usr/share/nginx/html/*

# # Copy built Next.js application and public assets
# COPY --from=builder /app/.next /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
