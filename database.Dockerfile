# Database Dockerfile for MySQL
FROM mysql:8.0

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=workshop_password
ENV MYSQL_DATABASE=WorkshopManagement

# Copy the database initialization script
COPY setup_database.sql /docker-entrypoint-initdb.d/

# Expose MySQL port
EXPOSE 3306

# The mysql image will automatically run scripts in /docker-entrypoint-initdb.d/
