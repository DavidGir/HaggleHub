const express = require('express');
const router = express.Router();
const database = require('../db/queries/products');

router.get('/', (req, res) => {
  const templateVars = {
    user: req.session.user
  };
  res.render('messages', templateVars);
});

module.exports = router;
