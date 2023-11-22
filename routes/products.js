const express = require('express');
const router = express.Router();
const database = require('../db/queries/products');

// The following consists of all /products routes

// The following consists of all /products routes

router.get('/', (req, res) => {
  const templateVars = {
    user: req.session.user
  };
  res.render('products', templateVars);
});

router.get('/favorites', (req, res) => {
  if (!req.session.user) {
    // Redirect to login page or render an error page if the user is not logged in:
    return res.redirect('/login');
  }

  const userId = req.session.user.id;

  database.getUserFavorites(userId)
    .then(favorites => {
      // Render the favorites page with the favorites data
      const templateVars = {
        favorites: favorites,
        user: req.session.user
      };
      console.log(templateVars);
      res.render('products_favorites', templateVars);
    })
    .catch(error => {
      console.error('Error fetching user favorites:', error);
    });
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
