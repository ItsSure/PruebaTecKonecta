import { Router } from "express";
import { SolicitudService } from "./solicitudService.js";
import { verificarToken, autorizarRol } from "../middlewares/auth.js";

const solicitudService = new SolicitudService();
export const solicitudController = Router();

solicitudController.post(
  "/filtrar",
  verificarToken,
  autorizarRol(["administrador"]),
  async (req, res) => {
    try {
      const { filtro = {}, opciones = {} } = req.body;
      const resultados = await solicitudService.obtenerSolicitudes(
        filtro,
        opciones
      );
      res.json(resultados);
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al obtener solicitudes",
        error: error.message,
      });
    }
  }
);

solicitudController.post(
  "/",
  verificarToken,
  autorizarRol(["administrador"]),
  async (req, res) => {
    try {
      const { codigo, descripcion, resumen, id_empleado } = req.body;
      const nuevaSolicitud = await solicitudService.crearSolicitud({
        codigo,
        descripcion,
        resumen,
        id_empleado,
      });
      res.status(201).json({
        mensaje: "Solicitud creada correctamente",
        solicitud: nuevaSolicitud,
      });
    } catch (error) {
      res
        .status(500)
        .json({ mensaje: "Error al crear solicitud", error: error.message });
    }
  }
);

solicitudController.delete(
  "/:id",
  verificarToken,
  autorizarRol(["administrador"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const mensaje = await solicitudService.eliminarSolicitud(id);
      res.status(200).json({ mensaje });
    } catch (error) {
      res
        .status(500)
        .json({ mensaje: "Error al eliminar solicitud", error: error.message });
    }
  }
);
