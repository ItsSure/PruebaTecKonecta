# Usar una imagen de Node.js
FROM node:18

# Crear un directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Establecer el entorno para Docker
ENV NODE_ENV=docker

# Construir la aplicación
RUN npm run build

# Usar una imagen de Nginx para servir la aplicación
FROM nginx:1.16.0-alpine

# Copiar la aplicación construida al directorio de Nginx
COPY --from=0 /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
