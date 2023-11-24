// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();
// Import cookieSession middleware:
const cookieSession = require("cookie-session");
// Import bcrypt:
const bcrypt = require("bcryptjs");

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
// Use of cookieSession in the app to parse incoming cookies off the req object:
app.use(cookieSession({
  name: "session",
  keys: ["asdfghjkl"],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const usersRoutes = require('./routes/users');
const productApiRoutes = require('./routes/products-api');
const productRoutes = require('./routes/products');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const messageRoutes = require('./routes/messages');
const messageApiRoutes = require('./routes/messages-api');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/users', usersRoutes);
app.use('/api/products', productApiRoutes);
app.use('/api/products/favorites', productApiRoutes);
app.use('/products', productRoutes);
app.use('/register', registerRoutes);
app.use('/admin', usersRoutes);
app.use('/login', loginRoutes);
app.use('/messages', messageRoutes);
app.use('/api/messages', messageApiRoutes);
app.use('/logout', loginRoutes);


// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  const templateVars = {
    user: req.session.user
  };
  res.render('index', templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
