#!/bin/zsh

echo "Starting Docker..."
docker-compose up -d
sleep 1

echo "Starting server with nodemon..."
nodemon --exec ./node_modules/.bin/babel-node ./src/server.js &
NID=$!


function stop {
  echo "Stopping nodemon..."
  kill $NID

  echo "Stopping Docker..."
  docker-compose down

  echo "Exiting..."

  exit
}

trap stop SIGINT SIGTERM

while true
do
  sleep 1
done