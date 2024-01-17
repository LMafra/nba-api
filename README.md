# Painel de Dados da NBA

Este projeto é um painel simples de dados da NBA, separado em componentes de backend e frontend. O backend processa dados da API da NBA, constrói informações e as envia para o frontend via uma API REST. O frontend, por sua vez, processa os dados e os apresenta ao usuário.

## Backend

### Tecnologias Utilizadas:
- **Express**: Framework web para Node.js.
- **Typescript**: Uma superset de JavaScript com tipagem estática.
- **PostgreSQL**: Banco de dados relacional para armazenar dados da NBA.

### Configuração:
1. Instale as dependências: `npm install`
2. Crie um banco de dados PostgreSQL e atualize a configuração em `.env` com os detalhes do seu banco de dados.
3. Execute as migrações: `npm run migration:run`
4. Inicie o servidor: `npm run dev`

### Endpoints da API:
- **GET /api/teams**: Obtenha uma lista de times da NBA.
- **GET /api/players**: Obtenha uma lista de jogadores da NBA.

## Frontend

### Tecnologias Utilizadas:
- **React**: Biblioteca JavaScript para construir interfaces de usuário.

- **Typescript**: Uma superset de JavaScript com tipagem estática.

### Configuração:
1. Instale as dependências: `npm install`
2. Inicie o servidor de desenvolvimento: `npm start`

### Recursos:
- Exibir informações sobre times da NBA.
- Exibir informações sobre jogadores da NBA.

## Docker:
Para executar o frontend com Docker:

```bash
# Copie o .env.example para sua máquina
cp .env.example .env

# Construa a imagem Docker
docker-compose up --build



#

```

## Estrutura de Pastas:
```plaintext
|-- /backend
|   |-- /dist
|   |-- /src
|   |   |-- /controllers
|   |   |-- /database
|   |   |-- /dto
|   |   |-- /helpers
|   |   |-- /middlewares
|   |   |-- /models
|   |   |-- /routes
|   |   |-- data-source.ts
|   |   |-- server.ts
|   |   |-- ...
|   |-- Dockerfile
|   |-- nodemon.json
|   |-- package.json
|   |-- tsconfig.json
|   |-- tslint.json
|
|-- /frontend
|   |-- /src
|   |   |-- /assets
|   |   |-- /components
|   |   |-- /config
|   |   |-- /context
|   |   |-- /features
|   |   |-- /public
|   |   |-- /redux
|   |   |-- /scripts
|   |   |-- /services
|   |   |-- /shared
|   |   |-- /styles
|   |   |-- /tests
|   |   |-- index.tsx
|   |   |-- ...
|   |-- package.json
|   |-- tsconfig.json
|   |-- Dockerfile
|
|-- .gitignore
|-- README.md
|-- docker-compose.yml
|-- .env
|-- ...
```
