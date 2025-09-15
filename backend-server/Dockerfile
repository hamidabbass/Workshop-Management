# Use Node.js 18 Alpine as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy server files
COPY server.js ./
COPY setup_database.js ./
COPY setup_database.sql ./

# Expose port 3003
EXPOSE 3003

# Start the server
CMD ["node", "server.js"]
