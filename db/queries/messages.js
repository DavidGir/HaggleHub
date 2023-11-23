const db = require('../connection');

const getMessages = (senderId, receiverId) => {
  let queryString = `
    SELECT
      *
    FROM
      messages
    JOIN
      users AS sender ON messages.sender_id = sender.id
    JOIN
      users AS receiver ON messages.receiver_id = receiver.id
    JOIN
      products ON messages.product_id = products.id`;

  const queryParams = [];

  if (senderId && receiverId) {
    // If both senderId and receiverId are provided, filter messages by sender and receiver
    queryString += `
        WHERE
          (messages.sender_id = $1 AND messages.receiver_id = $2)
          OR
          (messages.sender_id = $2 AND messages.receiver_id = $1)`;

    queryParams.push(senderId, receiverId);
  }

  queryString += `
      ORDER BY
        messages.sent_date ASC;`;

  console.log('SQL Query:', queryString, 'with parameters:', queryParams); // Add this line

  return db.query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => {
      console.error('Error executing query:', err);
      throw err;
    });
};


const sendMessage = (product_id, sender_id, receiver_id, content, sent_date) => {
  console.log('sendMessage function received:', product_id, sender_id, receiver_id, content, sent_date);

  const queryString = `
    INSERT INTO messages (product_id, sender_id, receiver_id, content, sent_date)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`;

  const values = [product_id, sender_id, receiver_id, content, sent_date];

  return db.query(queryString, values)
    .then(data => {
      console.log('sendMessage query result:', data.rows[0]);
      return data.rows[0];
    })
    .catch(error => {
      console.error('Error in sendMessage query:', error);
      throw error;
    });
};

module.exports = { getMessages, sendMessage };
