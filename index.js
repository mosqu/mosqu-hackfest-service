const WebSocket     = require("ws");
const express       = require('express');
const fileUpload    = require('express-fileupload');
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
            ws.send(JSON.stringify(data));
        });
    });
}

startServer();