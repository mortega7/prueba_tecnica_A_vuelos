import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Vuelo from './Vuelo.js';
import Usuario from './Usuario.js';

const Reserva = sequelize.define(
	'Reserva',
	{
		IdReserva: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		IdUsuario: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Usuario,
				key: 'IdUsuario',
			},
		},
		IdVuelo: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Vuelo,
				key: 'IdVuelo',
			},
		},
		FechaReserva: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		HoraReserva: {
			type: DataTypes.TIME,
			allowNull: false,
		},
		CantidadAsientosReserva: {
			type: DataTypes.SMALLINT,
			allowNull: false,
		},
		PrecioReserva: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		CodigoReserva: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{
		tableName: 'reserva',
		timestamps: false,
	}
);

Reserva.belongsTo(Vuelo, { foreignKey: 'IdVuelo' });
Reserva.belongsTo(Usuario, { foreignKey: 'IdUsuario' });

export default Reserva;
