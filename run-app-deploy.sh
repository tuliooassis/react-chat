#!/bin/bash

if [ $1 == "dev" ]; then
  docker-compose down
  docker-compose up -d --build
  echo "Dev environment ready!"
elif [ $1 == "prd" ]; then
  echo "Missing configuration for production environment!"
fi
