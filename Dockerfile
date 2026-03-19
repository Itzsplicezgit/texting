# Use official Node.js LTS image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json if you have one (optional for dependencies)
# For this example, we’ll install express and body-parser manually
# COPY package*.json ./

# Install dependencies
RUN npm install express body-parser

# Copy server and HTML files
COPY server.js .
COPY index.html .

# Expose port (Render automatically assigns PORT via env)
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
