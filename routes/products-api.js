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

// Admin add new item:

router.post('/', (req, res) => {


  // Get user id from cookies
  const adminId = req.session.user.id;

  // Get information from Add new item form
  const newItemObj = req.body;
  const title = newItemObj.title;
  const category = newItemObj.category;
  const thumbnail_photo_url = newItemObj.thumbnail_photo_url;
  const photo_url = newItemObj.photo_url;
  const description = newItemObj.description;
  const price = newItemObj.price;
  const current_inventory = newItemObj.current_inventory;
  // console.log('Received New Item: ', newItemObj)

  // Send info to database query
  database.addProduct(adminId, title, category, thumbnail_photo_url, photo_url, description, price, current_inventory)
    .then(item => {

      res.json({ success: true, item: item });
    })
    .catch(error => {
      console.error('Error fetching new item:', error);
    });
});


router.get('/favorites', (req, res) => {
  if (!req.session.user) {
    return res.redirect('login');
  }

  const userId = req.session.user.id;

  database.getUserFavorites(userId)
    .then(favorites => {
      res.json(favorites);
    })
    .catch(error => {
      console.error('Error fetching user favorites:', error);
    });
});

router.post('/favorites', (req, res) => {
  // Get user ID from session
  const userId = req.session.user.id;
  // Get product ID from request body
  const productId = req.body.productId;
  console.log("Received Product ID:", productId);
  // Ensure user is logged in
  if (!req.session.user) {
    return res.status(403).send("You must be logged in to add favorites.");
  }

  database.addFavorite(userId, productId)
    .then(favorite => {
      res.json(favorite);
    })
    .catch(err => {
      console.log('Error adding favorites:', err.message);
    });
});

// Route to process deletion request of a favorited product:
router.post('/favorites/:productId/delete', (req, res) => {
  const userId = req.session.user.id;
  const productId = req.params.productId;
  console.log(productId);

  database.deleteFavorite(userId, productId)
    .then(data => {
      console.log('Favorite deleted:', data);
      res.redirect('/products/favorites');
    })
    .catch(err => {
      console.log('Error deleting favorite:', err.message);
    });
});


module.exports = router;
