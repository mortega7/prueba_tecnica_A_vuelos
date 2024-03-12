import { Router } from 'express';
import { Op, Sequelize } from 'sequelize';
import Vuelo from '../../models/Vuelo.js';
import Aerolinea from '../../models/Aerolinea.js';
import Aeropuerto from '../../models/Aeropuerto.js';
import Ciudad from '../../models/Ciudad.js';
import Pais from '../../models/Pais.js';
import { obtenerFechaActual } from '../../helpers/funciones.js';

const apiVuelos = Router();

apiVuelos.get('/', async (req, res) => {
	try {
		const { IdAeropuertoOrigen, IdAeropuertoDestino, FechaDesde, FechaHasta } =
			req.query;

		if (
			!IdAeropuertoOrigen ||
			!IdAeropuertoDestino ||
			!FechaDesde ||
			!FechaHasta
		) {
			return res
				.status(400)
				.json({ error: 'Faltan datos para realizar la búsqueda' });
		}

		const vuelos = await Vuelo.findAll({
			where: {
				IdAeropuertoOrigen,
				IdAeropuertoDestino,
				FechaSalidaVuelo: {
					[Op.between]: [FechaDesde, FechaHasta],
				},
			},
			include: [
				{
					model: Aerolinea,
					include: [
						{
							model: Pais,
						},
					],
				},
				{
					model: Aeropuerto,
					as: 'AeropuertoOrigen',
					include: [
						{
							model: Ciudad,
							include: [
								{
									model: Pais,
								},
							],
						},
					],
				},
				{
					model: Aeropuerto,
					as: 'AeropuertoDestino',
					include: [
						{
							model: Ciudad,
							include: [
								{
									model: Pais,
								},
							],
						},
					],
				},
			],
			order: [
				['FechaSalidaVuelo', 'ASC'],
				['HoraSalidaVuelo', 'ASC'],
			],
		});

		res.json({ vuelos });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

apiVuelos.get('/disponibles', async (req, res) => {
	try {
		const fechaActual = obtenerFechaActual(new Date());
		const fechaHoraActual = `${fechaActual.anio}-${fechaActual.mes}-${fechaActual.dia} ${fechaActual.horas}:${fechaActual.minutos}:${fechaActual.segundos}`;

		const vuelos = await Vuelo.findAll({
			where: Sequelize.literal(
				`CONCAT(FechaSalidaVuelo, ' ', HoraSalidaVuelo) >= '${fechaHoraActual}'`
			),
			include: [
				{
					model: Aerolinea,
					include: [
						{
							model: Pais,
						},
					],
				},
				{
					model: Aeropuerto,
					as: 'AeropuertoOrigen',
					include: [
						{
							model: Ciudad,
							include: [
								{
									model: Pais,
								},
							],
						},
					],
				},
				{
					model: Aeropuerto,
					as: 'AeropuertoDestino',
					include: [
						{
							model: Ciudad,
							include: [
								{
									model: Pais,
								},
							],
						},
					],
				},
			],
			order: [
				['FechaSalidaVuelo', 'ASC'],
				['HoraSalidaVuelo', 'ASC'],
			],
		});

		res.json({ vuelos });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

apiVuelos.post('/', async (req, res) => {
	try {
		const { DatosVuelo } = req.body;

		const buscarVuelo = await Vuelo.findOne({
			where: { ...DatosVuelo },
		});

		if (!buscarVuelo) {
			const vuelo = await Vuelo.create({ ...DatosVuelo });
			res.status(201).json({ idVuelo: vuelo.IdVuelo });
		} else {
			res.status(400).json({ error: 'Ya existe un vuelo con los mismos datos.' });
		}
	} catch (err) {
		console.error(err.message);

		if (err.name === 'SequelizeForeignKeyConstraintError') {
			res.status(400).json({
				error: 'Los datos enviados no son válidos para crear el vuelo.',
			});
		} else {
			res
				.status(500)
				.json({ error: 'Ha ocurrido un error al procesar la solicitud.' });
		}
	}
});

export default apiVuelos;
