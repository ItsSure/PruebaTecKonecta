import { Router } from "express";
import { AuthService } from "./authService.js";

const authService = new AuthService();

export const authController = Router();

// Controlador para manejar la autenticación
authController.post("/login", async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    const token = await authService.login(correo, contrasena);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({
      mensaje: "Error al autenticar el usuario",
      error: error.message,
    });
  }
});

authController.post("/registro", async (req, res) => {
  const { correo, nombre, contrasena } = req.body;
  try {
    const token = await authService.registrar(correo, nombre, contrasena);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({
      mensaje: "Error al autenticar el usuario",
      error: error.message,
    });
  }
});
