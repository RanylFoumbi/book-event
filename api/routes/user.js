const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

/**
 * Routes Definition
 */
const userRoutes = app => {
  // // Base
  app.use('/', router);
   // Book a seat
   router.get('/all', userController.getllAllUsers);
   // Book a seat
   router.post('/book-seat', userController.bookSeat);
   //Delete all user
   router.delete('/delete-all', userController.deleteAllUsers);
};

// Exports
module.exports = userRoutes;
