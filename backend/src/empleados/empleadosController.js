import { Router } from "express";
import { EmpleadosService } from "./empleadosService.js";
import { verificarToken, autorizarRol } from "../middlewares/auth.js";

const empleadosService = new EmpleadosService();
export const empleadosController = Router();

empleadosController.post(
  "/filtrar",
  verificarToken,
  autorizarRol(["empleado", "administrador"]),
  async (req, res) => {
    try {
      const { filtro = {}, opciones = {} } = req.body;
      const empleados = await empleadosService.obtenerEmpleados(
        filtro,
        opciones
      );
      res.json({ empleados });
    } catch (error) {
      res
        .status(500)
        .json({ mensaje: "Error al obtener empleados", error: error.message });
    }
  }
);

empleadosController.post(
  "/",
  verificarToken,
  autorizarRol(["empleado", "administrador"]),
  async (req, res) => {
    try {
      const { nombre, fecha_ingreso, salario } = req.body;
      const nuevoEmpleado = await empleadosService.crearEmpleado({
        nombre,
        fecha_ingreso,
        salario,
      });
      res.status(201).json({
        mensaje: "Empleado creado correctamente",
        empleado: nuevoEmpleado,
      });
    } catch (error) {
      res
        .status(500)
        .json({ mensaje: "Error al crear empleado", error: error.message });
    }
  }
);
