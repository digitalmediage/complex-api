#!/bin/bash
# TODO must be test
docker build -t digitalmediage/complex-api .
docker push digitalmediage/complex-api

ssh deploy@$DEPLOY_SERVER << EOF
docker pull digitalmediage/complex-api
docker stop complex-api || true
docker rm complex-api || true
docker rmi digitalmediage/complex-api:current || true
docker tag digitalmediage/complex-api:latest digitalmediage/complex-api:current
docker run -d --restart always --name complex-api -p 3000:3000 digitalmediage/complex-api:current
EOF
