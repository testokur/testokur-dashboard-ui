
FROM node:latest
ARG SONAR_TOKEN
ENV SONAR_TOKEN $SONAR_TOKEN
WORKDIR /src
COPY . ./
RUN rm -rf package.json yarn.lock
RUN yarn init --yes && yarn add --dev sonarqube-scanner
RUN node sonar.js
