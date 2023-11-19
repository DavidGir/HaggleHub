const express = require('express');
const router  = express.Router();

// Route to display the login form:
router.get('/', (req, res) => {
  res.render('login');
});

// Route to handle login form submission:
router.post('/', (req, res) => {
  res.redirect('products');
});

module.exports = router;
