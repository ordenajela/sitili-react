# Establece la imagen base
FROM node:14-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia los archivos del proyecto al contenedor
COPY . .

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
