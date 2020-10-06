FROM node:latest as builder
WORKDIR /app

RUN npm i -g @angular/cli@"^10.1.4"
RUN npm i -g typescript@"~4.0.3"
RUN npm install -g @ionic/cli@6.11.11
RUN npm install -g capacitor

COPY ./ /app/
EXPOSE 8100
EXPOSE 4200
