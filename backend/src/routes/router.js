import { Router } from "express";
import { empleadosController } from "../empleados/empleadosController.js";
import { authController } from "../auth/authController.js";
import { solicitudController } from "../solicitud/solicitudController.js";

export const setAppApiController = (app) => {
  const appRouter = Router();
  app.use("/api/v1", appRouter);
  appRouter.use("/login", authController);
  appRouter.use("/empleados", empleadosController);
  appRouter.use("/solicitudes", solicitudController);
};
