FROM node:20-alpine3.18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run builder

EXPOSE 3000
CMD ["npm","run","start"]