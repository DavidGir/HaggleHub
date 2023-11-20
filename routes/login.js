const express = require('express');
const router  = express.Router();
const { getUserByUsername } = require('../db/queries/users');
const bcrypt = require('bcryptjs');


// GET Routes:

// Route to display the login form:
router.get('/', (req, res) => {



  res.render('login');
});



// -----------------------------------------------------------------------------

// POST routes:

// Route to handle login form submission:
router.post('/', (req, res) => {
  // Registered user just logs in with their username and password (email not required):
  const { username, password } = req.body;

  getUserByUsername(username)
    .then(user => {
      if (!user) {
        // User not found:
        res.status(403).send("Invalid login credentials.");
      } else if (!bcrypt.compareSync(password, user.password)) {
        // Password does not match
        res.status(403).send("Invalid login credentials.");
      } else {
        // Successful login
        // Set user information in the session cookie
        // Storing user ID in the cookie:
        req.session.userId = user.id;
        // Storing user username:
        req.session.username = user.username;
        res.redirect('/products');
      }
    })
    .catch(err => {
      // Handle errors
      console.log('Error during login:', err.message);
      res.redirect('/login');
    });
});


module.exports = router;
