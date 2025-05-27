import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'; 
dotenv.config();  // Load environment variables from .env file 

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'default_db_name', //DNM
  process.env.DB_USER || 'default_db_user', //alumno
  process.env.DB_PASSWORD || 'default_db_password', //alumnoipm
  {
  host: process.env.DB_HOST, 
  dialect: 'mysql'
});

sequelize.sync();