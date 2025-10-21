# Backend Dockerfile for Express API server
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy server files
COPY server.js ./

# Expose the API port
EXPOSE 3003

# Set environment variables
ENV NODE_ENV=production
ENV DB_HOST=database.pod
ENV DB_USER=root
ENV DB_PASSWORD=workshop_password
ENV DB_NAME=WorkshopManagement
ENV DB_PORT=3306

CMD ["node", "server.js"]
