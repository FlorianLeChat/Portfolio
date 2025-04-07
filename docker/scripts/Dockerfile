# syntax=docker/dockerfile:1

# Use an customized image of Node.js
# https://hub.docker.com/_/node
FROM node:lts-alpine

# Install system dependencies
RUN apk add --no-cache supercronic tzdata

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

# Add some cronjobs for automated tasks
RUN echo "0 0 * * * /usr/src/app/docker/scripts/logrotate.sh > /dev/null 2>&1" >> /var/spool/cron/crontabs/node

# Use non-root user
USER node

# Prepare project files and configuration to be built
RUN npm run build && npm prune --production && \
	chmod +x ./docker/scripts/entrypoint.sh ./docker/scripts/logrotate.sh