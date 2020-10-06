const { Router } 	= require('express');
const main 			= require('./main');
const user 			= require('./user');

const app = Router();
app.use('/', main);
app.use('/user', user);

module.exports = app;