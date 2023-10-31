# syntax=docker/dockerfile:1

# Use an customized image of Node.js
# https://hub.docker.com/_/node
FROM node:lts-alpine

# Add cURL for health check
RUN apk --no-cache add curl

# Set the working directory to the website files
WORKDIR /usr/src/app

# Change permissions of the working directory
RUN chown node:node .

# Copy all files required to build the project
COPY --chown=node:node . .

# Install all dependencies
# Use cache mount to speed up installation of existing dependencies
RUN --mount=type=cache,target=.npm \
	npm set cache .npm && \
	npm install && chown -R node:node ./node_modules

# Use non-root user
USER node

# Build the entire project
RUN npm run build

# Remove all development dependencies
RUN npm prune --production

# Run the website
CMD [ "npm", "run", "start" ]