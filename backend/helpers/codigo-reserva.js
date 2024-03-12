import 'dotenv/config';
import Reserva from '../models/Reserva.js';

function generarCodigoReserva() {
	const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const longitud = process.env.RESERVATION_CODE_LENGTH || 10;
	let codigo = '';

	for (let i = 0; i < longitud; i++) {
		codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
	}

	return codigo;
}

async function existeCodigoReserva(codigo) {
	const reserva = await Reserva.findOne({ where: { codigoReserva: codigo } });
	return !!reserva;
}

async function generarCodigoUnico() {
	let codigo = generarCodigoReserva();

	while (await existeCodigoReserva(codigo)) {
		codigo = generarCodigoReserva();
	}

	return codigo;
}

export { generarCodigoUnico };
