const { Router } 		= require('express');
const swaggerUi 		= require('swagger-ui-express');
let swaggerDocument 	= require('../docs/docs.json');
swaggerDocument.host 	= process.env.API_HOST ? process.env.API_HOST : swaggerDocument.host; 

const main 			= require('./main');
const user 			= require('./user');

const app = Router();

app.use('/', main);
app.use('/user', user);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
	customCss: '.swagger-ui .topbar { display: none }'
}));

module.exports = app;