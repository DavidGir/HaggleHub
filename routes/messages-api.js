const express = require('express');
const router = express.Router();
const database = require('../db/queries/messages');

// Fetch all messages
router.get('/', (req, res) => {
  const { senderId, receiverId } = req.query;

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
    });
});

// Route to handle sending messages
router.post('/', (req, res) => {
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

// Returns a list of users who have exchanged messages with the current user
router.get('/user-list', (req, res) => {
  // Get logged-in user's id
  const userId = req.session.user.id;
  database.getUsersWithMessages(userId)
    .then(users => {
      res.json(users);
      console.log(users);
    })
    .catch(error => {
      console.log("Error cannot fetch users with messages", error.message);
    });
});

// Route to get messages between the logged-in user and a selected user
router.get('/:loggedInUserId/:selectedUserId', (req, res) => {

  const { loggedInUserId, selectedUserId } = req.params;

  database.getConversationBetweenUsers(loggedInUserId, selectedUserId)
    .then(messages => {
      res.json(messages);
    })
    .catch(error => {
      console.log('Error getting conversation between users:', error.message);
    });
});




module.exports = router;
