FROM python:3.7

RUN apt-get update
RUN apt-get install -y \
	apt-utils \
	python3-dev \
	python3-pip \
	postgresql-9.5 \
	postgresql-contrib

RUN /usr/local/bin/python -m pip install --upgrade pip

ARG DJANGO_DEBUG
ARG DJANGO_SECRET_KEY
ARG POSTGRES_DB
ARG POSTGRES_PASSWORD
ARG POSTGRES_USER
ARG VERSION

ENV PYTHONUNBUFFERED 1

COPY requirements.txt /

RUN mkdir /src
RUN mkdir /static
WORKDIR /src

COPY . /src/

EXPOSE 80
RUN pip install -r requirements.txt

RUN ["chmod", "755", "docker-entrypoint.sh"]
ENTRYPOINT ["./docker-entrypoint.sh"]
