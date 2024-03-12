import 'dotenv/config';
import http from 'http';
import { app, APP_PORT } from './app.js';

const server = http.createServer(app);
server.listen(APP_PORT, () => {
	console.log(`Servidor funcionando en el puerto ${APP_PORT}`);
});
