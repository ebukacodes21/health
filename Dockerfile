# Build stage
FROM node:18-alpine3.20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Run stage
FROM node:18-alpine3.20
WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package*.json /app/
RUN npm install --only=production
COPY .env .env
EXPOSE 8000
CMD ["node", "dist/index.js"]
