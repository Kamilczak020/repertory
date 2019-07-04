import * as http from 'http';
import * as WebSocket from 'ws';
import App from './App';
import { normalizePort } from './util/normalizePort';
import { onError, onListening } from './util/serverUtil';

const port = normalizePort(process.env.HTTP_PORT || 3001);
App.set('port', port);

const server = http.createServer(App);
server.listen(port);
server.on('error', (error) => onError(error, port));
server.on('listening', () => onListening(server));

const wss = new WebSocket.Server({ server });
wss.on('connection', (ws: WebSocket) => {
  console.log('connection!');
});
