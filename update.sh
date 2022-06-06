docker rm -f $(docker ps -aq)
docker volume rm production_html
docker volume create production_html
#docker system prune --all
docker-compose  --profile prod up --build -d
cd /devops
docker-compose up -d
