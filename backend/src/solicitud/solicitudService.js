import { Solicitud } from "./solicitudEntity.js";
import { Empleado } from "../empleados/empleadosEntity.js";
export class SolicitudService {
  async obtenerSolicitudes(filtro, opciones) {
    try {
      const { codigo, descripcion, resumen, id_empleado } = filtro;
      const { page = 1, pageSize = 10 } = opciones;

      const where = {};
      if (codigo) where.codigo = String(codigo);
      if (descripcion) where.descripcion = descripcion;
      if (resumen) where.resumen = resumen;
      if (id_empleado) where.id_empleado = id_empleado;

      const offset = (page - 1) * pageSize;

      const { count, rows } = await Solicitud.findAndCountAll({
        where,
        include: {
          model: Empleado,
          attributes: ["id", "nombre"], // Ajusta los atributos que deseas incluir
        },
        limit: pageSize,
        offset,
      });

      return {
        totalItems: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage: page,
        solicitudes: rows,
      };
    } catch (error) {
      throw new Error("Error al obtener solicitudes: " + error.message);
    }
  }

  async crearSolicitud(datosSolicitud) {
    try {
      const nuevaSolicitud = await Solicitud.create(datosSolicitud);
      return nuevaSolicitud;
    } catch (error) {
      throw new Error("Error al crear solicitud: " + error.message);
    }
  }

  async eliminarSolicitud(id) {
    try {
      const solicitud = await Solicitud.findByPk(id);
      if (!solicitud) {
        throw new Error("Solicitud no encontrada");
      }
      await solicitud.destroy();
      return "Solicitud eliminada correctamente";
    } catch (error) {
      throw new Error("Error al eliminar solicitud: " + error.message);
    }
  }
}
