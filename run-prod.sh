#!/bin/bash
echo "
███████╗██╗   ██╗██████╗  ██████╗ ████████╗██╗     ██╗██╗   ██╗███████╗
██╔════╝██║   ██║██╔══██╗██╔═══██╗╚══██╔══╝██║     ██║██║   ██║██╔════╝
█████╗  ██║   ██║██████╔╝██║   ██║   ██║   ██║     ██║██║   ██║█████╗
██╔══╝  ██║   ██║██╔═══╝ ██║   ██║   ██║   ██║     ██║╚██╗ ██╔╝██╔══╝
██║     ╚██████╔╝██║     ╚██████╔╝   ██║   ███████╗██║ ╚████╔╝ ███████╗
╚═╝      ╚═════╝ ╚═╝      ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═══╝  ╚══════╝"
echo " "
echo "Starting Production Mode"
echo " "
if [ -e .env ]
  then
    cp .env ./backend
    docker-compose -f docker-compose-prod.yml build
    docker-compose -f docker-compose-prod.yml up -d 

  else
    echo "Place the .env file in the root directory"
fi

