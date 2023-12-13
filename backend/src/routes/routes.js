const express = require('express');
const routes = express.Router();

const PlayersController = require('../controllers/playersController');

routes.get('/players', PlayersController.index);

module.exports = routes;