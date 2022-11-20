const express = require('express');
const userRoutes = require('./user');

const router = express.Router();

const appRoutes = () => {
  const app = router;

  userRoutes(app);

  return app;
};

module.exports = appRoutes;
