const express = require('express');
const router  = express.Router();
const database = require('../db/queries/messages');


// Route to get all messages
router.get('/', (req, res) => {
  const senderId = req.query.senderId;
  const receiverId = req.query.receiverId;

  console.log('Sender ID:', senderId);
  console.log('Receiver ID:', receiverId);

  if (senderId && receiverId) {
    // If both senderId and receiverId are provided, filter messages by sender and receiver
    database.getMessages(senderId, receiverId)
      .then(messages => {
        console.log('Messages retrieved successfully:', messages);
        res.json(messages);
      })
      .catch(error => {
        console.error('Error getting messages:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  } else {
    // If no parameters are provided, retrieve all messages
    database.getMessages()
      .then(messages => {
        console.log('All messages retrieved successfully:', messages);
        res.json(messages);
      })
      .catch(error => {
        console.error('Error getting all messages:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  }
});

// Route to handle sending messages
router.post('/', (req, res) => {
  console.log('post route')
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
