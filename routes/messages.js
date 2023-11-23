const express = require('express');
const router = express.Router();
const database = require('../db/queries/products');

router.get('/', (req, res) => {
  const productId = req.query.product;
  const templateVars = {
    user: req.session.user,
    productId
  };
  res.render('messages', templateVars);
});

module.exports = router;
