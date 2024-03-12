import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Pais from './Pais.js';

const Ciudad = sequelize.define(
	'Ciudad',
	{
		IdCiudad: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		NombreCiudad: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		IdPais: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Pais,
				key: 'IdPais',
			},
		},
	},
	{
		tableName: 'ciudad',
		timestamps: false,
	}
);

Ciudad.belongsTo(Pais, { foreignKey: 'IdPais' });

export default Ciudad;
