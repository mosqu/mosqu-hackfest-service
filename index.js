const express = require('express');
const fileUpload    = require('express-fileupload');
const loaders = require('./src/loaders');

async function startServer() {
    const app = express();
    app.use(fileUpload());
    
    const port = process.env.PORT || 3000;

    const server = await loaders(app);
    server.listen(port, (error) => {
        if (error) {
            process.exit(1);
        }
        console.log('Server is listening on port: ', port);
  });
}

startServer();