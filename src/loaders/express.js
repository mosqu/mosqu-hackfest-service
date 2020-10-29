const bodyParser 	= require('body-parser');
const cors			= require('cors');
const compression 	= require('compression');

const routers 		= require('../routers');

module.exports = (app) => {
    return new Promise((resolve) => {
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(compression());
        app.use('/', routers);
        
        console.log('Express successfully loaded');
        resolve(app);
    });
};