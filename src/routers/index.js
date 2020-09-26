const { Router } = require('express');
const main = require('./main');

const app = Router();
app.use('/', main);

module.exports = app;