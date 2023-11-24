const express = require('express');
const router = express.Router();
const database = require('../db/queries/products');

router.get('/', (req, res) => {
  const productId = req.query.product;
  const templateVars = {
    user: req.session.user,
    productId
  };
  if (!req.session.user) {
    // Redirect to login page or render an error page if the user is not logged in:
    return res.redirect('/login');
  }
  res.render('messages', templateVars);
});

module.exports = router;
