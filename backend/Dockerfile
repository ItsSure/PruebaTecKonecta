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

# Exponer el puerto que tu aplicación usará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start"]
