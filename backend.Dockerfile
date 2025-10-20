FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --only=production

# Copy server files
COPY server.js ./
COPY setup_database.js ./
COPY setup_database.sql ./

# Expose the backend port
EXPOSE 3003

# Start the server
CMD ["node", "server.js"]
