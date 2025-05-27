import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../Config/db';

export class Usuario extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
}

Usuario.init({

    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },

    email:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, 
{
    sequelize,
    modelName: 'Usuario',
}
);
