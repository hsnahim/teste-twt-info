# teste-twt-info

## renicializar
em caso de uma reinicialização são nessesarios executar os seguintes comandos no terminal:
```bash
sudo docker-compose down -v --remove-orphans
sudo docker network prune -f
sudo docker volume prune -f
sudo rm -rf ./mysql-data
sudo systemctl restart docker
sudo docker-compose up --build
```