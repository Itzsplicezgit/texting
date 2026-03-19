FROM node:20-alpine
WORKDIR /usr/src/app

# Copy package.json
COPY package.json ./

# Upgrade npm to latest stable
RUN npm install -g npm@11.12.0

# Install dependencies
RUN npm install

# Copy app files
COPY server.js .
COPY index.html .
RUN mkdir -p uploads

EXPOSE 3000
CMD ["npm","start"]
