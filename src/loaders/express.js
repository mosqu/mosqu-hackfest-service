const bodyParser = require('body-parser');
const cors = require('cors');
const routers = require('../routers');

module.exports = (app) => {
    return new Promise((resolve) => {
        app.use(cors());
        app.use(bodyParser.json());
        app.use('/', routers);
        console.log('Express successfully loaded');
        resolve();
    });
};