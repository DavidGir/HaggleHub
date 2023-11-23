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

// Route for deleting a product (Admin specific):
router.post('/:productId/delete', (req, res) => {

  if (!req.session.user || !req.session.user.is_admin) {
    return res.status(403).send("Unauthorized: Only admins can delete products.");
  }

  const productId = req.params.productId;

  database.deleteProduct(productId)
    .then(data => {
      console.log("Product successfully deleted", data);
      res.redirect('/products');
    })
    .catch(err => {
      console.error('Error deleting product:', err.message);
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
