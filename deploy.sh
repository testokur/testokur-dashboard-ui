#!/bin/bash
docker load -i /home/docker-images/dashboard.tar
docker stop testokur-dashboard-qa
docker rm --force testokur-dashboard-qa
docker run -d  \
	-e VIRTUAL_HOST=panel-qa.testokur.com \
	-e VIRTUAL_PORT=80 \
	-e LETSENCRYPT_HOST=panel-qa.testokur.com \
	-e LETSENCRYPT_EMAIL=bilgi@testokur.com \
  -e authority=https://kimlik-qa.testokur.com \
  -e reduxLoggerActive=true \
  -e webapiUrl=https://webapi-qa.testokur.com \
  -e identityApiUrl=https://kimlik-qa.testokur.com \
	--name testokur-dashboard-qa \
	--restart=always  \
	--network=testokur \
	--network-alias=dashboard-qa \
	testokur-dashboard:latest
