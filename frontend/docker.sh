docker container rm -f react_plants_container
# docker image rm -f react-plants
docker build -t react-plants .
docker run -d -i -t -e WDS_SOCKET_PORT='0' -p 8669:3000 --name=react_plants_container react-plants
