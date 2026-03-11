# Use official Nginx image as base
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy website files to Nginx directory
COPY . /usr/share/nginx/html

# Expose port 80 inside the container
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]