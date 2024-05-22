import { Sequelize } from "sequelize";
import { config } from "./config/config.js";

const { dbName, dbUsername, dbPassword, dbHost, db_url } = config;

const db = new Sequelize(db_url, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Esto es opcional y depende de tu configuración de seguridad
    },
  },
});

export default db;
