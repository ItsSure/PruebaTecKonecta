import { DataTypes, Model } from "sequelize";
import db from "../data-source.js";

export class Empleado extends Model {}

Empleado.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_ingreso: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    salario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "Empleado",
    schema: "Konecta",
    tableName: "empleado",
    timestamps: false,
  }
);
