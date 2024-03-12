import { Router } from 'express';
import Aeropuerto from '../../models/Aeropuerto.js';
import Ciudad from '../../models/Ciudad.js';
import Pais from '../../models/Pais.js';

const apiAeropuertos = Router();

apiAeropuertos.get('/', async (req, res) => {
	try {
		const aeropuertos = await Aeropuerto.findAll({
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
		});

		res.json({ aeropuertos });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

export default apiAeropuertos;
