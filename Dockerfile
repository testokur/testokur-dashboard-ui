FROM node:current-alpine AS base

FROM node:latest as sonar
ARG SONAR_TOKEN
ENV SONAR_TOKEN $SONAR_TOKEN
WORKDIR /src
COPY . ./
RUN rm -rf package.json yarn.lock
RUN yarn init --yes && yarn add --dev sonarqube-scanner
RUN node sonar.js

FROM base as builder
ARG CODECOV_TOKEN
WORKDIR /src
COPY package.json yarn.lock ./
RUN yarn install --network-timeout 1000000
COPY . ./
RUN yarn precommit
RUN apk add git
RUN ./node_modules/.bin/codecov --token=$CODECOV_TOKEN
RUN yarn build

FROM nginx:mainline-alpine
COPY conf/ /etc/nginx/conf.d/
COPY --from=builder /src/dist /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .
RUN apk add --no-cache bash
RUN chmod +x env.sh
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
