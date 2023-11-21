const db = require('../connection');

// Following code consists of db queries:

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

const getProducts = (options, limit = 12) => {
  const queryParams = [];

  let queryString = `
  SELECT *
  FROM products`;

  const filters = [options.category, options.min_price, options.max_price].filter(element => element !== undefined).filter(element => element);

  if (filters.length) {
    queryString += `WHERE `;
  }

  if (options.category) {
    queryParams.push(`%${options.category}%`);
    queryString += `category LIKE $${queryParams.length}`;
  }

  if (options.min_price) {
    queryParams.push(options.min_price * 100);
    if (queryString.includes('WHERE category')) {
      queryString += `AND `;
    }
    queryString += `price >= $${queryParams.length} `;
  }

  if (options.max_price) {
    queryParams.push(options.max_price * 100);
    if (queryString.includes('WHERE category') || queryString.includes('WHERE min_price')) {
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


module.exports = { getProducts, addFavorite, getUserFavorites };
