/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const templateVars = {
    user: req.session.user
  };
  res.render('products', templateVars);
});

// Handle POST request - Process chat message
router.post('/', (req, res) => {
  // Access the message sent from the form
  const message = req.body.msg;

  // Test; eventually there will need to have logic to store messages in db:
  console.log('Received message on /products:', message);

  // After processing the message, redirect back to the products page
  res.redirect('/products');
});

router.get('/favorites', (req, res) => {
  res.render('products_favorites');
});

router.get('/favourites/:id', (req, res) => {
  res.redirect('products_show')
});

router.get('/:id', (req, res) => {
  res.render('products_show')
});

router.post('/:id/delete', (req, res) => {
  res.send('delete')
});

module.exports = router;
