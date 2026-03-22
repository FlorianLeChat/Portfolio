# syntax=docker/dockerfile:1

FROM node:20-slim AS base

RUN apt update && \
	apt install -y tzdata wget && \
    apt clean && rm -rf /var/lib/apt/lists/* \

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build && npm prune --omit=dev

FROM base AS production

COPY --from=base --chown=node:node /usr/src/app ./
