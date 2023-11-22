const db = require('../connection');

// Following code consists of db queries:

const getProducts = (options, limit = 12) => {
  const queryParams = [];

  let queryString = `
  SELECT *
  FROM products `;


  const filters = [options.id, options.category, options.min_price, options.max_price].filter(element => element !== undefined).filter(element => element);

  if (filters.length) {
    queryString += `WHERE `;
  }

  if (options.id) {
    queryParams.push(options.id);
    queryString += `id = $${queryParams.length}`
  }

  if (options.category) {
    queryParams.push(`%${options.category}%`);
    queryString += `category LIKE $${queryParams.length}`;
  }

  if (options.min_price) {
    queryParams.push(options.min_price);
    if (queryString.includes('WHERE category')) {
      queryString += `AND `;
    }
    queryString += `price >= $${queryParams.length} `;
  }

  if (options.max_price) {
    queryParams.push(options.max_price);
    if (queryString.includes('WHERE category') || queryString.includes('WHERE price')) {
      queryString += `AND `;
    }
    queryString += `price <= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  return db.query(queryString, queryParams)
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
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.log('Error executing addFavorite query', err.message);
    });
};

// Query to get users' favorites:
const getUserFavorites = (userId) => {
  const queryString = `
    SELECT *
    FROM favourites
    JOIN products ON products.id = favourites.product_id
    WHERE favourites.user_id = $1;`;

  const values = [userId];

  return db.query(queryString, values)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.log('Error executing addFavorite query', err.message);
    });
};

// Function to handle deletion of a favorite product:

const deleteFavorite = (userId, productId) => {
  // Store SQL query string:
  const queryString = `
    DELETE FROM favourites
    WHERE user_id = $1 AND product_id = $2
    RETURNING *;`;

  const values = [userId, productId];

  return db.query(queryString, values)
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.log('Error executing deleteFavorite query', err.message);
    });
};

module.exports = { getProducts, addFavorite, getUserFavorites, deleteFavorite };
