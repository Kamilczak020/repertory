import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(__dirname, '../.env')});

import * as http from 'http';
import App from './App';
import { normalizePort } from './util/normalizePort';
import { onError, onListening } from './util/serverUtil';
import { sequelize as database } from './database';

database.authenticate().then(() => database.sync()).catch((err) => console.log(err));

const port = normalizePort(process.env.HTTP_PORT || 3001);
App.set('port', port);

const server = http.createServer(App);
server.listen(port);
server.on('error', (error) => onError(error, port));
server.on('listening', () => onListening(server));
