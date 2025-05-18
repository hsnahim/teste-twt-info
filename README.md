# teste-twt-info

Este projeto é um sistema de cadastro e gerenciamento de processos judiciais, utilizando React no frontend, Node.js/Express no backend e MySQL como banco de dados. O deploy é feito via Docker Compose.

## Estrutura do Projeto
- **frontend**: React + Material UI (pasta `src/`)
- **backend**: Node.js/Express (arquivo `server.js`)
- **banco de dados**: MySQL (inicialização via script SQL)
- **docker**: Orquestração dos serviços

## Como executar o projeto

### Pré-requisitos
- Docker e Docker Compose instalados

### Subindo o ambiente
Execute o comando abaixo para subir todos os serviços (frontend, backend e banco de dados):
```bash
sudo docker-compose up --build
```

O frontend estará disponível em: http://localhost:5173
O backend estará disponível em: http://localhost:3001

### Reinicialização completa
Se precisar reiniciar o ambiente do zero (limpando volumes e dados):
```bash
sudo docker-compose down -v --remove-orphans
sudo docker network prune -f
sudo docker volume prune -f
sudo rm -rf ./mysql-data
sudo systemctl restart docker
sudo docker-compose up --build
```

## Principais arquivos e pastas
- `src/App.jsx`: Componente principal React, integra formulário, tabela e diálogo de confirmação.
- `src/components/ProcessoForm.jsx`: Formulário para cadastro/edição de processos.
- `src/components/ProcessosTable.jsx`: Tabela de exibição dos processos cadastrados.
- `src/components/ConfirmacaoDialog.jsx`: Diálogo de confirmação após cadastro.
- `src/components/parcers.js`: Funções utilitárias para conversão de dados entre backend e frontend.
- `server.js`: API REST Node.js/Express para CRUD de processos.
- `CREATE_TABLE_Prossesos.sql`: Script de criação da tabela MySQL.
- `docker-compose.yml`, `Dockerfile.*`: Configuração dos containers Docker.

## Fluxo básico da aplicação
1. O usuário cadastra ou edita processos pelo frontend React.
2. O frontend faz requisições à API Express para criar, listar, editar ou remover processos.
3. O backend manipula os dados no banco MySQL e retorna as respostas ao frontend.

## Observações
- O sistema diferencia processos de MG dos demais na confirmação de cadastro.
- O código está comentado para facilitar manutenção e entendimento.