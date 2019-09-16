#!/bin/bash
docker stop testokur-dashboard && docker rm --force testokur-dashboard
docker run -d  \
    --env-file  /home/env/dashboard.env \
	--name testokur-dashboard \
	--restart=always  \
	--network=testokur \
	--network-alias=dashboard \
	nazmialtun/testokur-dashboard-ui:latest
