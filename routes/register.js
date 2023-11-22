const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');
// addUser is a function that adds a user upon registration:
const { addUser } = require('../db/queries/users');


// GET Routes:

router.get('/', (req, res) => {
  const templateVars = {
    user: req.session.user
  };
  res.render('register', templateVars);
});

// -----------------------------------------------------------------------------

// POST routes:

router.post('/', (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Create new user with hashed password
  addUser({ username, email, password: hashedPassword })
    .then(user => {
      // Handle the response like log the user in or redirect:
      req.session.userId = user.id;
      req.session.username = user.username;
      res.redirect('/login');
    })
    .catch(err => {
      // Handle errors, e.g., username already taken or database errors
      console.log('Registration error:', err.message);
      res.redirect('/register');
    });
});






module.exports = router;


