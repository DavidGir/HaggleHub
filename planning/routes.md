<!-- This will serve as planning our routes using BREAD / REST convention -->

# Suggested RESTful API Endpoints

## User Management:

- POST /register 
  - Register a new user.

- POST /login 
  - Authenticate a user.

<!-- - GET /users/:id 
  - Retrieve user profile information. -->

## Products Overview:

- GET /products
  - Retrieve all items.

- GET /products/:id 
  - Retrieve a specific item's details.

## Favourites:

- POST /favourites 
  - Add an item to a user's favorites.

- GET /favourites
  - Retrieve a user's favorite items.

- GET / favourites/:id 

- POST /favourites/:id/delete
  - Remove an item from favorites.

## Messaging:

- POST /messages/:id
  - Send a new message.

- GET /messages
  - Retrieve messages page

-GET /messages/:id
  - Retrieve specific message conversation with users

## Admin-Specific:

- POST /products
  - Admins can post items to be seen by collectors

- POST /products/update
  - Admins can update listings

- POST /products/:id/sold 
  - Mark an item as SOLD!

- POST /products/:id/delete
  - Admins can remove items from the site
 
  
