FROM node:latest as builder
WORKDIR /app

RUN npm i -g @angular/cli@8.2.2
RUN npm i -g typescript@">=3.4.0 <3.6.0"
RUN npm install -g @ionic/cli@6.11.8
RUN npm install -g capacitor

COPY ./ /app/
EXPOSE 8100
EXPOSE 4200
