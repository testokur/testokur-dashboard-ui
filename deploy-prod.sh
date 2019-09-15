#!/bin/bash
docker load -i /home/images/dashboard.tar
docker stop testokur-dashboard && docker rm --force testokur-dashboard
docker run -d  \
    --env-file  /home/env/dashboard.env \
	--name testokur-dashboard \
	--restart=always  \
	--network=testokur \
	--network-alias=dashboard \
	testokur-dashboard:latest
