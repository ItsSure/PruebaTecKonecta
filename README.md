# Proyecto PruebaTecKonecta

Bienvenido a Proyecto PruebaTecKonecta. Este proyecto contiene un backend y un frontend listos para ser desplegados en contenedores Docker.

## Paso 1: Clonar el Repositorio

git clone https://github.com/ItsSure/PruebaTecKonecta.git

cd PruebaTecKonecta

## Paso 2: Levantar los Contenedores con Docker Compose

docker-compose up --build

## Paso 3: Verificar la Ejecución

Frontend: http://localhost:8080

El Backend escucha las peticiones a esa ruta: http://localhost:3000

## Paso 4: Detener los Contenedores

docker-compose down

# Mejores Prácticas

Si se ejecutan los pasos anteriores, el front y el backend estaran funcionando correctamente pero el backend hará la conexión a una base de datos que esta en vercel esto ocurre porque se ejecuta el script start de package.json, si se quiere usar en local se debería cambiar en el dockerfile del backend start por devL para ejecutar el proyecto con el .env.dev que hace la conexión local (Se debe modificar .env.dev con los datos de tu base de datos local)

# Observaciones

- El fichero createdb.sql contiene los querys para la creación de las tablas, secuencias y relaciones en la base de datos.

- Hay problemas cuando se hace login las primeras veces con el token de autorización (Es algo que me di cuenta que pasa cuando se corre el front y back con docker pero mientras desarrollaba no)
- Simplemente es hacer login recargar la pagina (Presionar f5) y al volverse a logear ya mandara el token correctamente (se darán cuenta porque la tabla solicitudes se llena automáticamente). hecho eso ya se podrán consumir los demás servicios para consultar, insertar, eliminar si tiene permisos por rol.

- Me falto la parte de pruebas unitarias por cuestiones de tiempo.
