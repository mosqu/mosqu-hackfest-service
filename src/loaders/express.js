const bodyParser 	= require('body-parser');
const cors			= require('cors');
const routers 		= require('../routers');
const compression 	= require('compression');

module.exports = (app) => {
    return new Promise((resolve) => {
        app.use(cors());
        app.use(bodyParser.json());
        app.use(compression());
        app.use('/', routers);
        
        console.log('Express successfully loaded');
        resolve();
    });
};