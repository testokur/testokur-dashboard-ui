#!/bin/bash
docker stop testokur-dashboard
docker rm --force testokur-dashboard
docker run -d  \
  --env-file  /home/docker-images/dashboard.env \
	--name testokur-dashboard \
	--restart=always  \
	--network=testokur \
	--network-alias=dashboard \
	testokur-dashboard:latest
