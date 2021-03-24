#!/bin/bash
docker pull nazmialtun/testokur-dashboard-ui:latest
docker stop testokur-dashboard && docker rm --force testokur-dashboard
docker run -d  \
    --env-file  /home/env/dashboard.env \
	--name testokur-dashboard \
	--restart=always  \
	--network=testokur \
	--network-alias=dashboard \
	nazmialtun/testokur-dashboard-ui:0.0.781
echo Y | docker system prune
