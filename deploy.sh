#!/bin/bash
docker load -i /home/images/dashboard.tar
docker stop testokur-dashboard-qa
docker rm --force testokur-dashboard-qa
docker run -d  \
  --env-file  /home/env/dashboard-qa.env \
	--name testokur-dashboard-qa \
	--restart=always  \
	--network=testokur \
	--network-alias=dashboard-qa \
	testokur-dashboard:latest
