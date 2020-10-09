FuPotLive - Backend Infrastructure, Management Portal, and Web App
==============================================================
This project is an API accessible application containerized by [Docker](https://www.docker.com). 
It will provide and manage data for FuPot's mobile and web apps, 
while supporting a platform for automation, authentication, content management, and more.

Requirements
------------
- Docker
- Docker Compose
- Some form of Terminal

Stack
-----
- Django
- Django Rest Framework
- PostgreSQL
- NGINX
- Angular
- Redis and Celery (we might implement for question checking abilities)

Installation for MacOS
----------------------
**Docker**
This project will require the latest version of [Docker](https://docs.docker.com/installation/), 
and [Docker CE](https://store.docker.com/editions/community/docker-ce-desktop-mac). 
Docker Compose is included in these installations.

Installation for Ubuntu (Server)
-----------------------
First and foremost, ensure that apt-get is updated to the latest version:

    sudo apt-get update

**Docker CE**
Remove any previous versions of Docker that may have been installed:

    sudo apt-get remove docker docker-engine docker.io

Intall packages to allow apt-get to access repositories via HTTPS:

    sudo apt-get install apt-transport-https ca-certificates curl software-properties-common

Add Docker’s official GPG key:

    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

Verify the key's fingerprint:

    sudo apt-key fingerprint 0EBFCD88

**Docker Compose**
Download and install the latest version of Docker Compose:

    sudo curl -L "https://github.com/docker/compose/releases/download/1.25.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

Apply executable permissions to Docker Compose's binary:
    
    sudo chmod +x /usr/local/bin/docker-compose

Test the installation:

    docker-compose --version
    docker-compose version x.x.x, build xxxxxxx

Download Nodejs
----------------------
[Download NodeJs](https://nodejs.org/en/)

**Install These Packages (inside frontend folder after git pull or clone)**

`npm i`


FuPotLive Launch Script
-------------------
These script in the project's base directory can be used to launch this application in
development, and production modes. 

Some examples are as follows:
- `./run-dev.sh` - starts everthing in development mode. [Backend](http://localhost:8000/admin) 
- `./create-super-user.sh` - creates admin user for the development servers only
- `./serve-frontend.sh` - starts up frontend [Frontend](http://localhost:8100) 
- `./stop-docker-development.sh` - stops docker-services in development mode.
- `./stop-docker-production.sh` - stops docker-services in production mode.
