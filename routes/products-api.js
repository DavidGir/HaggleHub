/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const database = require('../db/queries/products');

router.get('/', (req, res) => {

  database.getProducts(req.query, 12)
    .then((rows) => {
      res.json(rows);
    })
    .catch(error => {
      console.error(error);
      res.send(error);
    });

});

router.get('/favorites', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  const userId = req.session.user.id;

  database.getUserFavorites(userId)
    .then(rows => {
      res.json(rows);
    })
    .catch(error => {
      console.error('Error fetching user favorites:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});



router.post('/favorites', (req, res) => {
  // Get user ID from session
  const userId = req.session.userId;
  // Get product ID from request body
  const { productId } = req.body;

  database.addFavorite(userId, productId)
    .then(favorite => {
      res.json(favorite);
    })
    .catch(err => {
      res.send(err.message);
    });
});



module.exports = router;
