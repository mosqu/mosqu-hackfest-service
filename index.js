const express = require('express');
const loaders = require('./src/loaders');

async function startServer() {
    const app = express();
    const port = process.env.PORT || 3000;

    await loaders(app);
    app.listen(port, (error) => {
        if (error) {
            process.exit(1);
        }
        console.log('Server is listening on port: ', port);
  });
}

startServer();