const mariadb = require('mariadb');

// create a pool of database connections
const pool = mariadb.createPool({
  host: '93.184.77.240',
  user: 'ne028300',
  password: 'BZni9_7_',
  database: 'ne028300db',
  connectionLimit: 10
});

// define a function to execute SQL queries
async function executeQuery(query, params) {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(query, params);
    return result;
  } catch (error) {
    throw error;
  } finally {
    if (conn) {
      conn.release();
    }
  }
}

module.exports = {
  executeQuery
};
