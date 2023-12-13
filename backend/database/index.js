const pgp = require ('pg-promise')();

const db = pgp(`postgres://postgres:postgres@localhost:5432/database-nba`);

const tableName = 'users';

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS ${tableName} (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
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