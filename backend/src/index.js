import { config } from "./config/config.js";
import express from "express";
import cors from "cors";
import { setAppApiController } from "./routes/router.js";
import {
  boomErrorHandler,
  errorHandler,
  logErrors,
} from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes
setAppApiController(app);

// Middlewares de manejo de errores
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// Rutas principales
app.use("/api/v1", setAppApiController);
// Iniciar el servidor
app.listen(config.appPort, () => {
  console.log(
    `Servidor escuchando en el puerto http://localhost:${config.appPort}`
  );
});
