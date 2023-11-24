const express = require('express');
const router = express.Router();
const database = require('../db/queries/messages');


// Fetch all messages
// Fetch all messages
router.get('/', (req, res) => {
  const { senderId, receiverId } = req.query;

  console.log('Sender ID:', senderId);
  console.log('Receiver ID:', receiverId);

  if (!senderId && !receiverId) {
    // If no parameters are provided, retrieve all messages
    database.getMessages()
      .then(messages => res.json(messages))
      .catch(error => {
        console.error('Error getting all messages:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  } else {
    // If both senderId and receiverId are provided, filter messages by sender and receiver
    database.getMessages(senderId, receiverId)
      .then(messages => res.json(messages))
      .catch(error => {
        console.error('Error getting messages between two users:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  }
});

// Route to get messages between two users
router.get('/:senderId/:receiverId', (req, res) => {
  const { senderId, receiverId } = req.params;
  database.getMessages(senderId, receiverId)
    .then(messages => res.json(messages))
    .catch(error => {
      console.error('Error getting messages between two users:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Route to handle sending messages
router.post('/', (req, res) => {
  console.log('Received POST request with body:', req.body);

  const { productId, senderId, receiverId, content, sent_date } = req.body;

  // Add any validation or error handling as needed

  database.sendMessage(productId, senderId, receiverId, content, sent_date)
    .then(newMessage => {
      console.log('Message sent successfully:', newMessage);
      res.json(newMessage);
    })
    .catch(error => {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    });
});

module.exports = router;
