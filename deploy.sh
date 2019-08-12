#!/bin/bash
docker load -i /home/docker-images/dashboard.tar
docker stop testokur-dashboard-qa
docker rm --force testokur-dashboard-qa
docker run -d  \
  --env-file  /home/docker-images/dashboard-qa.env \
	--name testokur-dashboard-qa \
	--restart=always  \
	--network=testokur \
	--network-alias=dashboard-qa \
	testokur-dashboard:latest
