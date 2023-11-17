<!-- This will serve as planning our routes using BREAD / REST convention -->

# Suggested RESTful API Endpoints
## User Management:
- POST /users/register 
  - Register a new user.
- POST /users/login 
  - Authenticate a user.
- GET /users/:id 
  - Retrieve user profile information.

## Item Management:
- POST /items 
  - Post a new item for sale.
- GET /items 
  - Retrieve all items.
- GET /items/:id 
  - Retrieve a specific item's details.
- PUT /items/:id 
  - Update a specific item's details.
- DELETE /items/:id 
  - Remove an item from listings.

## Favorites:
- POST /favorites 
  - Add an item to a user's favorites.
- GET /favorites/user/:userId 
  - Retrieve a user's favorite items.
- DELETE /favorites/:id 
  - Remove an item from favorites.

## Messaging:
- POST /messages 
  - Send a new message.
- GET /messages/conversation/:conversationId 
  - Retrieve messages in a conversation.

## Admin-Specific:
- PUT /admin/items/:id/mark-sold 
  - Mark an item as sold.
- GET /admin/users 
  - Retrieve all user accounts (for management).
