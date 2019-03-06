FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Copy main files
COPY package.json package-lock.json ./
COPY app.js .

# Extracts the local static responses tar into the folder static-responses within the image 
ADD ./static-responses/responses.tar.gz ./static-responses

# Install app and dependencies
RUN npm install

COPY . .

EXPOSE 8081

CMD [ "npm", "start" ]
