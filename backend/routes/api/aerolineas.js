import { Router } from 'express';
import Pais from '../../models/Pais.js';
import Aerolinea from '../../models/Aerolinea.js';

const apiAerolineas = Router();

apiAerolineas.get('/', async (req, res) => {
	try {
		const aerolineas = await Aerolinea.findAll({
			include: [
				{
					model: Pais,
				},
			],
		});

		res.json({ aerolineas });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

export default apiAerolineas;
