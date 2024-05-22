import { Empleado } from "./empleadosEntity.js";

export class EmpleadosService {
  async obtenerEmpleados(filtro, opciones) {
    try {
      const { fecha_ingreso, nombre, salario } = filtro;
      const { page = 1, pageSize = 10 } = opciones;

      const where = {};
      if (fecha_ingreso) where.fecha_ingreso = fecha_ingreso;
      if (nombre) where.nombre = nombre;
      if (salario) where.salario = salario;

      const offset = (page - 1) * pageSize;
      console.log(where);
      const { count, rows } = await Empleado.findAndCountAll({
        where,
        limit: pageSize,
        offset,
      });
      return {
        totalItems: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage: page,
        empleados: rows,
      };
    } catch (error) {
      throw new Error("Error al obtener empleados: " + error.message);
    }
  }

  async crearEmpleado(datosEmpleado) {
    try {
      const nuevoEmpleado = await Empleado.create(datosEmpleado);
      return nuevoEmpleado;
    } catch (error) {
      throw new Error("Error al crear empleado: " + error.message);
    }
  }
}
