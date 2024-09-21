# 🧑‍💻 Development
FROM node:22.9.0-alpine as dev

# Añadir las librerías compartidas necesarias
RUN apk add --no-cache libc6-compat

# Crear el directorio de trabajo
WORKDIR /app

# Establecer el entorno de desarrollo
ENV NODE_ENV dev

# Copiar el package.json y el package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# 🏡 Production Build
FROM node:22.9.0-alpine as build

# Crear el directorio de trabajo
WORKDIR /app

# Añadir las librerías compartidas necesarias
RUN apk add --no-cache libc6-compat

# Establecer el entorno de producción
ENV NODE_ENV production

# Copiar las dependencias instaladas en la etapa de desarrollo
COPY --from=dev /app/node_modules ./node_modules

# Copiar el código fuente
COPY . .

# Generar el build de producción
RUN npm run build

# Instalar solo las dependencias de producción y limpiar la cache
RUN npm install --production && npm cache clean --force

# 🚀 Production Server
FROM node:22.9.0-alpine as prod

# Crear el directorio de trabajo
WORKDIR /app

# Añadir las librerías compartidas necesarias
RUN apk add --no-cache libc6-compat

# Establecer el entorno de producción
ENV NODE_ENV production

# Copiar solo los archivos necesarios desde la etapa de construcción
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# Comando para iniciar la aplicación
CMD ["node", "dist/main.js"]