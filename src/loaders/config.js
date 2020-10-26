const dotenv = require('dotenv');
const path = require('path');

module.exports = () => {
    return new Promise((resolve) => {
    	process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    	process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, '../../config/gcloud-credential.json');

	    const config = dotenv.config({ path: './config/.env' });
	    if (config.error) {
	        throw new Error('Could not find .env file');
	    }
	    console.log('Environment successfully loaded');
	    resolve();
    });
};