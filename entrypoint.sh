#!/bin/sh

echo "Starting your custom environment..."
# Add custom commands here

# Execute the CMD or command specified in the Dockerfile
exec "$@"
