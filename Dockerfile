# Use the official Nginx image
FROM nginx

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy your Angular application's Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/

# Copy your Angular application's build files to Nginx web root directory
COPY dist/orc-tatu /usr/share/nginx/html

#Copy your certs files to configure ssl
COPY orctattoo.crt /etc/ssl/certs/orctattoo.crt
COPY orctattoo.key /etc/ssl/private/orctattoo.key

# Expose port 80
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
