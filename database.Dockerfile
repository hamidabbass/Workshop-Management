FROM mysql:8.0

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=WorkshopManagement

# Copy the SQL initialization script
COPY setup_database.sql /docker-entrypoint-initdb.d/

# Expose MySQL port
EXPOSE 3306
