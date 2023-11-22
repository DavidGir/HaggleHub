const express = require('express');
const router  = express.Router();
const { getUserByUsername } = require('../db/queries/users');
const bcrypt = require('bcryptjs');


// GET Routes:

// Route to display the login form:
router.get('/', (req, res) => {
  const templateVars = {
    user: req.session.user
  };
  res.render('login', templateVars);
});


// -----------------------------------------------------------------------------

// POST routes:

// Route to handle login form submission:
router.post('/', (req, res) => {
  // Registered user just logs in with their username and password (email not required):
  const { username, password } = req.body;

  getUserByUsername(username)
    .then(user => {
      // If user not found and password not a match:
      if (!user || !bcrypt.compareSync(password, user.password)) {
        res.status(403).send("Invalid login credentials.");
      } else {
        // Successful login
        req.session.user = {
          id: user.id,
          username: user.username,
          is_admin: user.is_admin
        };
        res.redirect('/products');
      }
    })
    .catch(err => {
      // Handle errors
      console.log('Error during login:', err.message);
      res.redirect('/login');
    });
});

// Logout route:
router.post('/logout', (req, res) => {
  // Clear session:
  req.session = null;
  res.redirect('/login');
});

module.exports = router;
