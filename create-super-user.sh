#!/bin/bash
echo "
███████╗██╗   ██╗██████╗  ██████╗ ████████╗██╗     ██╗██╗   ██╗███████╗
██╔════╝██║   ██║██╔══██╗██╔═══██╗╚══██╔══╝██║     ██║██║   ██║██╔════╝
█████╗  ██║   ██║██████╔╝██║   ██║   ██║   ██║     ██║██║   ██║█████╗
██╔══╝  ██║   ██║██╔═══╝ ██║   ██║   ██║   ██║     ██║╚██╗ ██╔╝██╔══╝
██║     ╚██████╔╝██║     ╚██████╔╝   ██║   ███████╗██║ ╚████╔╝ ███████╗
╚═╝      ╚═════╝ ╚═╝      ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═══╝  ╚══════╝"
echo " "
echo "Create Admin User For Development Server"
echo "COPY \"python manage.py createsuperuser"\"
echo " "
docker-compose -f docker-compose-dev.yml exec backend sh
