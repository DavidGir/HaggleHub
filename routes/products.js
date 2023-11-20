const express = require('express');
const router = express.Router();

// The following consists of all /products routes

// The following consists of all /products routes

router.get('/', (req, res) => {
  res.render('products');
});

router.get('/favorites', (req, res) => {
  res.render('products_favorites');
});

router.get('/favourites/:id', (req, res) => {
  res.redirect('products_show');
});

router.get('/:id', (req, res) => {
  res.render('products_show');
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
