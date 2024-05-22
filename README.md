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
