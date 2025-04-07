# Use Nginx as the base image
FROM nginx:alpine

# Copy your website content into the Nginx public folder
COPY . /usr/share/nginx/html

# Expose port 80 to the world
EXPOSE 80

# Nginx runs automatically; no CMD needed
