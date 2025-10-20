#!/bin/sh

# Load environment variables
if [ -f .env.production ]; then
  export $(cat .env.production | grep -v '^#' | xargs)
fi

# Start Express backend in background
node server.js &

# Start Next.js frontend
node server.js
