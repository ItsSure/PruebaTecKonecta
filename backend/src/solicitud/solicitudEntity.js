import { DataTypes, Model } from "sequelize";
import db from "../data-source.js";
import { Empleado } from "../empleados/empleadosEntity.js"; // Asegúrate de ajustar la ruta según tu estructura de archivos

export class Solicitud extends Model {}

Solicitud.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    resumen: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    id_empleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Empleado,
        key: "id",
      },
    },
  },
  {
    sequelize: db,
    modelName: "Solicitud",
    schema: "Konecta",
    tableName: "solicitud",
    timestamps: false,
  }
);

// Definir la relación entre Solicitud y Empleado
Empleado.hasMany(Solicitud, { foreignKey: "id_empleado" });
Solicitud.belongsTo(Empleado, { foreignKey: "id_empleado" });
