import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Usuario = sequelize.define(
	'Usuario',
	{
		IdUsuario: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		CorreoUsuario: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		NombresUsuario: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		ApellidosUsuario: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'usuario',
		timestamps: false,
	}
);

export default Usuario;
