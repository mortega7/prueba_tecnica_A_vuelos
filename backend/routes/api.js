import { Router } from 'express';
import apiVuelos from './api/vuelos.js';
import apiReservas from './api/reservas.js';
import apiEstadisticas from './api/estadisticas.js';
import apiAeropuertos from './api/aeropuertos.js';
import apiAerolineas from './api/aerolineas.js';

const apiRouter = Router();

apiRouter.use('/vuelos', apiVuelos);
apiRouter.use('/reservas', apiReservas);
apiRouter.use('/estadisticas', apiEstadisticas);
apiRouter.use('/aeropuertos', apiAeropuertos);
apiRouter.use('/aerolineas', apiAerolineas);

export { apiRouter };
