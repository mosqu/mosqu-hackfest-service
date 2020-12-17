const express       = require('express');
const fileUpload    = require('express-fileupload');
const { Client }    = require('whatsapp-web.js');
const loaders       = require('./src/loaders');

async function startServer() {
    const app       = express();
    app.use(fileUpload());
    const port      = process.env.PORT || 3000;

    const app2      = await loaders(app);
    const server    = require("http").createServer(app2);
    const route     = server.listen(port, (error) => {
        if (error) {
            process.exit(1);
        }
        console.log('Server is listening on port: ', port);
    });

    const io        = require("socket.io")(server, {
      cors: {
        origin: '*',
      }
    });

    io.on('connection', function (socket) {
        console.log("Connected succesfully to the socket ...");        

        socket.on('blast', function (content) {
            console.log(content);

            const client        = new Client({
                puppeteer: { args: ['--no-sandbox'] }
            });

            client.on('qr', (qr) => {
                console.log('QR RECEIVED', qr);
                socket.emit('blast/response', {
                    action: 'qr',
                    msg: qr
                });
            });
             
            client.on('ready', () => {
                console.log('Client is ready!');
                socket.emit('blast/response', {
                    action: 'ready',
                    msg: 'ready'
                });
                if (content.message && content.phone) {
                    client.sendMessage(`${content.phone}@c.us`, content.message)
                    .then(() => {
                        socket.emit('blast/response', {
                            action: 'done',
                            msg: 'success'
                        });
                    })
                    .catch((error) => {
                        socket.emit('blast/response', {
                            action: 'done',
                            msg: 'error'
                        });
                        console.log(error);
                    });
                }

            });

            client.initialize().catch((error) => {
                console.log(error);
            });

        });
    });
}

startServer();