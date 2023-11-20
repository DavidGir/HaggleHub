const db = require('../connection');

// Following code consists of db queries:

const getProducts = (options, limit = 10) => {
  return db.query(`SELECT * FROM products
  LIMIT $1;`, [limit])
  .then(data => {
    return data.rows;
  });
}

module.exports = { getProducts }
