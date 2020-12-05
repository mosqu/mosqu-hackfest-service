const WebSocket     = require('ws');
const express       = require('express');
const fileUpload    = require('express-fileupload');
const { Client }    = require('whatsapp-web.js');
const loaders       = require('./src/loaders');

const wss           = new WebSocket.Server({ noServer: true });

async function startServer() {
    const app = express();
    app.use(fileUpload());
    
    const port = process.env.PORT || 3000;

    const server    = await loaders(app);
    const route     = server.listen(port, (error) => {
        if (error) {
            process.exit(1);
        }
        console.log('Server is listening on port: ', port);
    });

    route.on('upgrade', (request, socket, head) => {
        const topic = request.url.slice(1);

        if (!topic) {
            socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
            socket.destroy();
            return;
        }

        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit(topic, ws, request);
        });
    });

    wss.on('blast', (ws, request) => {
        ws.on('message', async (data) => {
            const client        = new Client();
            const content       = JSON.parse(data);

            client.on('qr', (qr) => {
                console.log('QR RECEIVED', qr);
                ws.send(JSON.stringify({
                    action: 'qr',
                    msg: qr
                }));
            });
             
            client.on('ready', () => {
                console.log('Client is ready!');
                ws.send(JSON.stringify({
                    action: 'ready',
                    msg: 'ready'
                }));
                if (content.message && content.phone) {
                    client.sendMessage(`${content.phone}@c.us`, content.message)
                    .then(() => {
                        ws.send(JSON.stringify({
                            action: 'done',
                            msg: 'success'
                        }));
                    })
                    .catch((error) => {
                        ws.send(JSON.stringify({
                            action: 'done',
                            msg: 'error'
                        }));
                        console.log(error);
                    });
                }

            });
             
            client.on('message', msg => {
                if (msg.body == '!ping') {
                    msg.reply('pong');
                }
            });

            client.initialize().catch((error) => {
                console.log(error);
            });
        });
    });
}

startServer();