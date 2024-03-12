import { Router } from 'express';
import { Sequelize } from 'sequelize';
import Vuelo from '../../models/Vuelo.js';
import Aerolinea from '../../models/Aerolinea.js';
import Reserva from '../../models/Reserva.js';

const apiEstadisticas = Router();

apiEstadisticas.get('/aerolineas-reservas', async (req, res) => {
	try {
		const reservas = await Reserva.findAll({
			attributes: [
				'Vuelo.IdAerolinea',
				'Vuelo.Aerolinea.NombreAerolinea',
				[
					Sequelize.fn('SUM', Sequelize.col('CantidadAsientosReserva')),
					'CantidadReservas',
				],
			],
			include: [
				{
					model: Vuelo,
					attributes: ['IdAerolinea'],
					include: [
						{
							model: Aerolinea,
							attributes: ['NombreAerolinea'],
						},
					],
				},
			],
			group: ['Vuelo.IdAerolinea', 'Vuelo.Aerolinea.NombreAerolinea', 'Vuelo.IdVuelo'],
			order: [[Sequelize.literal('CantidadReservas'), 'DESC']],
		});

		res.json({ reservas });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

apiEstadisticas.get('/cantidad-aerolineas', async (req, res) => {
	try {
		const aerolineas = await Aerolinea.count();
		res.json({ aerolineas });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

export default apiEstadisticas;
