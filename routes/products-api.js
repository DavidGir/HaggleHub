/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const database = require('../db/queries/products');

router.get('/', (req, res) => {
  // console.log(req.body);
  database.getProducts(req.query, 10)
    .then((rows) => {
      res.json(rows)
    })
    .catch(error => {
      console.error(error);
      res.send(error);
    })

});


module.exports = router;
