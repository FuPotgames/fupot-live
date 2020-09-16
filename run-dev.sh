#!/bin/bash
echo "
███████╗██╗   ██╗██████╗  ██████╗ ████████╗██╗     ██╗██╗   ██╗███████╗
██╔════╝██║   ██║██╔══██╗██╔═══██╗╚══██╔══╝██║     ██║██║   ██║██╔════╝
█████╗  ██║   ██║██████╔╝██║   ██║   ██║   ██║     ██║██║   ██║█████╗
██╔══╝  ██║   ██║██╔═══╝ ██║   ██║   ██║   ██║     ██║╚██╗ ██╔╝██╔══╝
██║     ╚██████╔╝██║     ╚██████╔╝   ██║   ███████╗██║ ╚████╔╝ ███████╗
╚═╝      ╚═════╝ ╚═╝      ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═══╝  ╚══════╝"
echo " "
echo "Starting Development Mode"
echo " "
if [ -e .env ]
  then
    cp .env ./backend
    docker-compose -f docker-compose-dev.yml build
    docker-compose -f docker-compose-dev.yml up

  else
    echo "Place the .env file in the root directory"
fi

