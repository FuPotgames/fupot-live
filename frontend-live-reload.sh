#!/bin/bash
echo "
███████╗██╗   ██╗██████╗  ██████╗ ████████╗██╗     ██╗██╗   ██╗███████╗
██╔════╝██║   ██║██╔══██╗██╔═══██╗╚══██╔══╝██║     ██║██║   ██║██╔════╝
█████╗  ██║   ██║██████╔╝██║   ██║   ██║   ██║     ██║██║   ██║█████╗
██╔══╝  ██║   ██║██╔═══╝ ██║   ██║   ██║   ██║     ██║╚██╗ ██╔╝██╔══╝
██║     ╚██████╔╝██║     ╚██████╔╝   ██║   ███████╗██║ ╚████╔╝ ███████╗
╚═╝      ╚═════╝ ╚═╝      ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═══╝  ╚══════╝"
echo " "
echo "Angular Reload"
echo " "
while true;do
docker-compose -f docker-compose-dev.yml up --build frontend
done
