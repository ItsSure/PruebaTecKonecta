import jwt from "jsonwebtoken";
import { User } from "../auth/userEntity.js";

export const verificarToken = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    if (!token) {
      return res
        .status(401)
        .json({ mensaje: "Token de autenticación no proporcionado" });
    }
    const decoded = jwt.verify(token, "secreto");
    const usuario = await User.findOne({ where: { id: decoded.id } });
    if (!usuario) {
      return res.status(401).json({ mensaje: "Usuario no autorizado" });
    }
    req.usuario = usuario;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ mensaje: `Token inválido o expirado ${error.message}` });
  }
};

export const autorizarRol = (rolesPermitidos) => {
  return (req, res, next) => {
    const { rol } = req.usuario;
    if (!rolesPermitidos.includes(rol)) {
      return res
        .status(403)
        .json({ mensaje: "Acceso denegado para este rol de usuario" });
    }
    next();
  };
};
