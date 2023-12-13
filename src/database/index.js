const pgp = require ('pg-promise')();

const db = pgp('postgres://postgres:85245600le@127.0.0.1:5432/database-nba');

const tableName = 'usuarios';

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS ${tableName} (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100)
  );
`;

// Execute a consulta para criar a tabela
db.none(createTableQuery)
  .then(() => {
    console.log('Tabela criada com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao criar a tabela:', error);
  })
  .finally(() => {
    pgp.end();
  });