/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('products');
});

router.get('/favorites', (req, res) => {
  res.render('products_favorites');
})

router.get('/:id', (req, res) => {
  res.render('products_show')
});


module.exports = router;
