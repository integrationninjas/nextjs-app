FROM node:20-alpine3.18 AS builder

# Declare build time environment variables (if needed)
# ARG MONGO_PASSWORD_ENV
# ARG SITE_URL_ENV

# # Set default values for environment variables (if needed)
# ENV MONGO_PASSWORD=$MONGO_PASSWORD_ENV
# ENV SITE_URL_ENV=$SITE_URL_ENV

WORKDIR /app
COPY package*.json ./
RUN  npm install --production
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm","run", "start"]  # Start the Next.js server in production mode