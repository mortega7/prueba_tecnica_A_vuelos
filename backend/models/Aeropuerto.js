import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Ciudad from './Ciudad.js';

const Aeropuerto = sequelize.define(
	'Aeropuerto',
	{
		IdAeropuerto: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		NombreAeropuerto: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		CodigoAeropuerto: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		IdCiudad: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Ciudad,
				key: 'IdCiudad',
			},
		},
	},
	{
		tableName: 'aeropuerto',
		timestamps: false,
	}
);

Aeropuerto.belongsTo(Ciudad, { foreignKey: 'IdCiudad' });

export default Aeropuerto;
