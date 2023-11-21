const express = require('express');
const router = express.Router();

// The following consists of all /products routes

// The following consists of all /products routes

router.get('/', (req, res) => {
  const templateVars = {
    user: req.session.user
  };
  res.render('products', templateVars);
});

router.get('/favorites', (req, res) => {
  const templateVars = {
    user: req.session.user
  };
  res.render('products_favorites', templateVars);
});

router.get('/favorites/:id', (req, res) => {
  res.redirect('products_show');
});

router.get('/:id', (req, res) => {
  const templateVars = {
    user: req.session.user
  };
  res.render('products_show', templateVars);
});

router.post('/', (req, res) => {
  console.log('Ok');

  getProducts()
    .then;
});

// // Handle POST request - Process chat message
// router.post('/', (req, res) => {
//   // Access the message sent from the form
//   const message = req.body.msg;

//   // Test; eventually there will need to have logic to store messages in db:
//   console.log('Received message on /products:', message);

//   // After processing the message, redirect back to the products page
//   res.redirect('/products');
// });


router.post('/:id/delete', (req, res) => {
  res.send('delete');
});

module.exports = router;
