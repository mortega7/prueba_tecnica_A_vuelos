import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Pais from './Pais.js';

const Aerolinea = sequelize.define(
	'Aerolinea',
	{
		IdAerolinea: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		NombreAerolinea: {
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
		tableName: 'aerolinea',
		timestamps: false,
	}
);

Aerolinea.belongsTo(Pais, { foreignKey: 'IdPais' });

export default Aerolinea;
