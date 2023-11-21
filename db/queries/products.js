const db = require('../connection');

// Following code consists of db queries:

const getProducts = (options, limit = 10) => {
  return db.query(`SELECT * FROM products
  LIMIT $1;`, [limit])
    .then(data => {
      return data.rows;
    });
};

// When users add favorite products:
const addFavorite = (userId, productId) => {
  const queryString = `
    INSERT INTO favourites (user_id, product_id, added_date)
    VALUES ($1, $2, NOW())
    RETURNING *;`;

  const values = [userId, productId];

  return db.query(queryString, values)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      console.log('Error executing addFavorite query', err.message);
    });
};

// Query to users' favorites:
const getUserFavorites = (userId) => {
  const queryString = `
    SELECT *
    FROM favourites
    JOIN products ON products.id = favourites.product_id
    WHERE favourites.user_id = $1;`;

  const values = [userId];

  return db.query(queryString, values)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      console.log('Error executing addFavorite query', err.message);
    });
};


module.exports = { getProducts, addFavorite, getUserFavorites };
