FROM node:20-alpine
WORKDIR /usr/src/app

# Copy package.json and package-lock.json if available
COPY package.json ./

# Install dependencies
RUN npm install

# Copy app files
COPY server.js .
COPY index.html .
RUN mkdir -p uploads

EXPOSE 3000
CMD ["npm","start"]
