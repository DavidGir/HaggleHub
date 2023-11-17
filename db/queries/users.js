const db = require('../connection');

// Following code consists of helper functions:

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers };
