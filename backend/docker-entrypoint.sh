#!/bin/bash

MY_VAR=$(grep Mode .env | xargs)
mode=${MY_VAR#*=}
echo $mode

# Start server
echo "Starting server"

if [[ $mode == "prod" ]]
then
    echo "prod"
    python manage.py migrate
    rm -r static
    sleep 2
    python manage.py collectstatic
    gunicorn --workers=3 --threads=3 backend.wsgi:application --bind 0.0.0.0:8000
fi
if [[ $mode == "dev" ]]
then
    echo "dev"
    python manage.py  makemigrations
    python manage.py migrate
    rm -r static
    sleep 2
    python manage.py collectstatic
    gunicorn --workers=3 --threads=3 backend.wsgi:application --bind 0.0.0.0:8000
fi
if [[ $mode == "" ]]
then
    echo "Arguments required: -m prod or dev"
fi
