#!/bin/sh

# Run cron service in background
supercronic /etc/crontabs/node &

# Start NextJS local server
npm run start