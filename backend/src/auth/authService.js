import { User } from "./userEntity.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  userEntity;

  constructor() {
    this.userEntity = User; // Utiliza el modelo User directamente
  }

  async login(correo, contrasena) {
    try {
      const usuario = await this.userEntity.findOne({ where: { correo } });
      console.log(usuario.contrasena);
      if (!usuario) {
        throw new Error("Correo electrónico no registrado");
      }
      const contrasenaValida = await bcrypt.compare(
        contrasena,
        usuario.contrasena
      );
      if (!contrasenaValida) {
        throw new Error("contrasena incorrecta");
      }

      // Genera un token JWT firmado con la información del usuario
      const token = jwt.sign(
        { id: usuario.id, correo: usuario.correo, rol: usuario.rol },
        "secreto",
        { expiresIn: "1h" }
      );
      return { token, rol: usuario.rol };
    } catch (error) {
      throw new Error("Error al autenticar el usuario: " + error.message);
    }
  }

  async registrar(correo, nombre, contrasena) {
    try {
      const usuarioExistente = await this.userEntity.findOne({
        where: { correo },
      });
      if (usuarioExistente) {
        throw new Error("El correo electrónico ya está registrado");
      }
      const hashcontrasena = await bcrypt.hash(contrasena, 10);
      const nuevoUsuario = await this.userEntity.create({
        nombre: nombre,
        correo,
        contrasena: hashcontrasena,
        rol: "empleado",
      });
      console.log(nuevoUsuario);
      // Devuelve un mensaje indicando que el usuario ha sido registrado exitosamente
      return "Usuario registrado exitosamente";
    } catch (error) {
      throw new Error("Error al crear el usuario: " + error.message);
    }
  }
}
