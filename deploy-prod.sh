#!/bin/bash
docker stop testokur-dashboard
docker rm --force testokur-dashboard
docker run -d  \
	-e VIRTUAL_HOST=panel.testokur.com \
	-e VIRTUAL_PORT=5000 \
	-e LETSENCRYPT_HOST=panel.testokur.com \
	-e LETSENCRYPT_EMAIL=bilgi@testokur.com \
  -e authority=https://kimlik-qa.testokur.com \
  -e reduxLoggerActive=false \
  -e webapiUrl=https://webapi.testokur.com \
	--name testokur-dashboard \
	--restart=always  \
	--network=testokur \
	--network-alias=dashboard \
	testokur-dashboard:latest
