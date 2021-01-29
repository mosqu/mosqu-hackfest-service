const express       = require('express');
const fileUpload    = require('express-fileupload');
const { Client }    = require('whatsapp-web.js');
const loaders       = require('./src/loaders');
const masjid        = require('./src/services/masjid');

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
        socket.emit('message', {
            message: 'Connected succesfully to the socket ...'
        });        

        socket.on('blast', function (content) {
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

                if (content.message && content.phone.length) {
                    Promise.all(content.phone.map((number) => {
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                console.log(number);
                                client.sendMessage(`${number}@c.us`, content.message)
                                .then(() => {
                                    resolve({
                                        number: number,
                                        status: 'success'
                                    });
                                })
                                .catch((error) => {
                                    console.log(error);
                                    resolve({
                                        number: number,
                                        status: 'error',
                                        error: error
                                    });
                                });
                            }, 1000);
                        });
                    })).then((result) => {
                        socket.emit('blast/response', {
                            action: 'done',
                            msg: 'success',
                            result: result
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        socket.emit('blast/response', {
                            action: 'done',
                            msg: 'error'
                        });
                    });
                }
            });

            client.initialize().catch((error) => {
                console.log(error);
            });
        });

        socket.on('bot', (data) => {
            const client = new Client({
                puppeteer: { 
                    args: ['--no-sandbox'] 
                }
            });
            client.on('qr', (qr) => {
                console.log('> QR code is received', qr);
                socket.emit('bot/response', {
                    action: 'qr',
                    data: qr,
                    message: 'QR Code is generated'
                });
            });
            client.on('ready', () => {
                console.log('> Client is ready!');
                socket.emit('bot/response', {
                    action: 'ready',
                    data: null,
                    message: 'Client is ready'
                });
            });
            client.on('message', async (data) => {
                if (data) {
                    if (!data.fromMe) {
                        const triggerContent = await masjid.findBotTrigger({
                            key: data.body
                        });
                        if (triggerContent) {
                            const message = triggerContent.content;
                            client.sendMessage(data.from, message)
                            .then(() => {
                                console.log({
                                    status: true,
                                    from: data.from,
                                    to: data.to,
                                    body: data.body,
                                    message: message
                                });
                            })
                            .catch(() => {
                                console.log({
                                    status: false,
                                    from: data.from,
                                    to: data.to,
                                    body: data.body,
                                    message: error
                                });
                            });
                        } else {
                            console.log({
                                status: false,
                                from: data.from,
                                to: data.to,
                                body: data.body,
                                message: 'trigger is not found'
                            });
                        }   
                    }
                }
            });
            client.initialize().catch((error) => {
                console.log('> Error : ',error);
            });
        });
    });
}

startServer();