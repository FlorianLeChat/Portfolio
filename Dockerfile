# syntax=docker/dockerfile:1

# Use an customized image of Node.js
# https://hub.docker.com/_/node
FROM node:lts-alpine

# Set the working directory to the website files
WORKDIR /usr/src/app

# Copy only files required to install dependencies
COPY package*.json .

# Install all dependencies
# Use cache mount to speed up installation of existing dependencies
RUN --mount=type=cache,target=/usr/src/app/.npm \
	npm set cache /usr/src/app/.npm && \
	npm install

# Copy the remaining files AFTER installing dependencies
COPY --chown=node:node . .

# Build the entire project
RUN npm run build

# Change the ownership of the build files
RUN chown -R node:node /usr/src/app/.next

# Use non-root user
USER node

# Expose the port 3000
EXPOSE 3000

# Run the website
CMD [ "npx", "next", "start" ]