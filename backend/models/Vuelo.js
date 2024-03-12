import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Aerolinea from './Aerolinea.js';
import Aeropuerto from './Aeropuerto.js';

const Vuelo = sequelize.define(
	'Vuelo',
	{
		IdVuelo: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		IdAerolinea: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Aerolinea,
				key: 'IdAerolinea',
			},
		},
		IdAeropuertoOrigen: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Aeropuerto,
				key: 'IdAeropuerto',
			},
		},
		IdAeropuertoDestino: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Aeropuerto,
				key: 'IdAeropuerto',
			},
		},
		FechaSalidaVuelo: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		HoraSalidaVuelo: {
			type: DataTypes.TIME,
			allowNull: false,
		},
		FechaLlegadaVuelo: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		HoraLlegadaVuelo: {
			type: DataTypes.TIME,
			allowNull: false,
		},
		PrecioVuelo: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		tableName: 'vuelo',
		timestamps: false,
	}
);

Vuelo.belongsTo(Aerolinea, { foreignKey: 'IdAerolinea' });
Vuelo.belongsTo(Aeropuerto, {
	foreignKey: 'IdAeropuertoOrigen',
	as: 'AeropuertoOrigen',
});
Vuelo.belongsTo(Aeropuerto, {
	foreignKey: 'IdAeropuertoDestino',
	as: 'AeropuertoDestino',
});

export default Vuelo;
