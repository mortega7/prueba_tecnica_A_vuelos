import { Router } from 'express';
import { generarCodigoUnico } from '../../helpers/codigo-reserva.js';
import Usuario from '../../models/Usuario.js';
import Vuelo from '../../models/Vuelo.js';
import Reserva from '../../models/Reserva.js';

const apiReservas = Router();

apiReservas.get('/', async (req, res) => {
	try {
		const reservas = await Reserva.findAll({
			include: [
				{
					model: Vuelo,
				},
				{
					model: Usuario,
				},
			],
		});

		res.json({ reservas });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

apiReservas.get('/:CodigoReserva', async (req, res) => {
	try {
		const { CodigoReserva } = req.params;
		const reserva = await Reserva.findOne({
			where: {
				CodigoReserva,
			},
			include: [
				{
					model: Vuelo,
				},
				{
					model: Usuario,
				},
			],
		});

		if (reserva) {
			res.json({ reserva });
		} else {
			res.status(404).json({ error: 'Reserva no encontrada' });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

apiReservas.post('/', async (req, res) => {
	try {
		const { DatosUsuario, DatosReserva } = req.body;
		let usuario = await Usuario.findOne({
			where: { CorreoUsuario: DatosUsuario.CorreoUsuario },
		});

		if (!usuario) {
			usuario = await Usuario.create(DatosUsuario);
		}

		const CodigoReserva = await generarCodigoUnico();
		const reserva = await Reserva.create({
			...DatosReserva,
			IdUsuario: usuario.IdUsuario,
			CodigoReserva,
		});

		res.status(201).json({ codigo: reserva.CodigoReserva });
	} catch (err) {
		console.error(err.message);

		if (err.name === 'SequelizeForeignKeyConstraintError') {
			res
				.status(400)
				.json({ error: 'El vuelo especificado no existe o no es válido.' });
		} else {
			res
				.status(500)
				.json({ error: 'Ha ocurrido un error al procesar la solicitud.' });
		}
	}
});

export default apiReservas;
