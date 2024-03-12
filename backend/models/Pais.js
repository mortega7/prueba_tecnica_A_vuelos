import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Pais = sequelize.define(
	'Pais',
	{
		IdPais: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		NombrePais: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'pais',
		timestamps: false,
		name: {
			singular: 'Pais',
			plural: 'Paises',
		},
	}
);

export default Pais;
