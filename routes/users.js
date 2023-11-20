/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('users');
});

router.post('/', (req, res) => {
  res.redirect('users');
});

// Route to display the admin dash:
router.get('/admin', (req, res) => {
  res.render('admin');
});

// Route to handle admin form submission:
router.post('/admin', (req, res) => {
  res.redirect('admin');
});


module.exports = router;
