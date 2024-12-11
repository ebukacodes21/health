# Build stage
FROM node:alpine AS builder
# entry
WORKDIR /app
# Copy the package files and install dependencies
COPY package*.json ./
RUN npm install
# Copy the source file
COPY . .
# Ensure that tsc runs and creates the dist folder
RUN npm run build  # compile TypeScript



# Run stage
FROM node:alpine
WORKDIR /app
# Copy the compiled output from the builder stage
COPY --from=builder /app/dist .  
# Copy env
COPY .env ./  
# Install production dependencies
COPY package*.json ./
RUN npm install --production
# Exposed port
EXPOSE 8000
# Run the application
CMD ["node", "dist/index.js"]  # entry point is index.js
