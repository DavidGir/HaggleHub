# Hagglehub

[#### The Punko Fops Store image ]
Landing page
![Landing Page](./images/example.png)
Login
![Login](./images/example.png)
Products Page
![Products](./images/mages/example.png)
Messages
![Messages](./images/mages/example.png)


## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Routes](#routes)
- [Middleware](#middleware)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Introduction

An app where you can purchase Funko Pop! Toys & Vinyl Figures! for sale. You can pick a specific categories of items based on your personal preferences. This lets buyers find the items they are looking for quickly, and easily contact sellers.

## Project Setup

This WebApp, Hagglehub, was the first experience that either members of our group had ever built. As such, it was important to find common ground as early in the process as possible to reduce any miscommunication, and unwanted team dynamic. To combat this, we did the following:

Invested time in the planning phase to design our user stories. This user story was aligned with the project requirements in mind but we felt it was important to add our own touch to it. On a whim fueled by good humor and coincidence, we settled on creating a store based on 'Funko Pop! Toys & Vinyl Figures'!.

Created the ERD and Database Schema. 

## Installation

To set up the project locally:
```

1. Clone the repository:
bash

  $ git clone https://github.com/lighthouse-labs/node-skeleton
  
 2. Navigate to the Project Directory

  $  cd your-project

3. Install Dependencies

  $  npm install bcrypt
  $  npm install cookie-session

```
## Database setup
To set up the database:

```
  $ npm install pg

1.Start Postgrest server

  $ startpostgres

2. Enter Postgres to begin creating schema and adding data to 

  $  psql

3. Create database

  $ CREATE DATABASE Hagglehub OWNER >!(insert postgresql username)!<; 

```
## Usage

 To run the web app locally, use the following commands:
 ```

1. Start the Server:

    npm run local 

2. Open Your Browser: Navigate to http://localhost:8080.

```
# Configuration

## Routes
 ### User/Login/Logout Routes:
 These routes are responsible for handling user authentification and user/admin authorization.

  ### Product Routes:
 These routes are responsible for product categorization, product updating, deletion and information(stock) modification, as in the case of use by admin.

 ### Message Routes:
 The reoutes primarily deal with messaging between user and admin. Due to the nature of time, these messages are attached to product id. Should we have more resourcces, we would love to expand these routes to include sockets for live chat functionality.

### Middleware
 - morgan: HTTP request logger middleware.
 - express.urlencoded: Middleware to parse incoming request bodies.
 - sassMiddleware: Middleware for compiling SASS/SCSS files.
 - express.static: Middleware for serving static files.
 - cookieSession: Middleware for parsing incoming cookies.

### Dependencies
 - express
 - morgan
 - sassMiddleware
 - cookie-session

### Features



## Contributing
This webApp was a labor of love of the LHL Alpha Group Trio. Comprised of Ana Franco, David Giroux and Gerald Mwangi. Many thanks to the instructors and mentors OF LHL whose opinions helped us build it.

## License
 This project is licensed under the imaginary demo License of 2023. It does not expire nor is it issuable to anyone other than LHL Cohort of 16 Oct West. Any use of this license must be approved after by a commitee of the LHL Alpha Group with a minimum wait period of 42 days since the date of license request.

