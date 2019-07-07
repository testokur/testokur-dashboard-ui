FROM node:current-alpine AS base

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
