# syntax=docker/dockerfile:1

FROM node:20-slim AS base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build && npm prune --omit=dev

FROM node:20-slim AS production

RUN apt update && \
	apt install -y tzdata && \
    apt clean && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY --from=base --chown=node:node /usr/src/app ./
