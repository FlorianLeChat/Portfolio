# syntax=docker/dockerfile:1

# Use an customized image of Node.js
# https://hub.docker.com/_/node
FROM node:lts-alpine

# Set the working directory to the website files
WORKDIR /usr/src/app

# Change permissions of the working directory
RUN chown node:node .

# Copy all files required to build the project
COPY --chown=node:node . .

# Create a directory for the Next.js build cache
RUN mkdir -p .next && chown -R node:node .next

# Install all dependencies
# Use cache mount to speed up installation of existing dependencies
RUN --mount=type=cache,target=.npm \
	npm set cache .npm && \
	npm ci && chown -R node:node ./node_modules

# Build the entire project
RUN npm run build && chown -R node:node .next

# Use non-root user
USER node

# Remove all development dependencies
RUN npm prune --production