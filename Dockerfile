# Etapa 1: Construcción (Build Stage)
FROM node:20-alpine AS builder

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias primero para aprovechar la caché de capas de Docker
COPY package*.json ./

# Instalamos las dependencias
RUN npm ci

# Copiamos el resto del código fuente
COPY . .

# Compilamos el proyecto (esto generará la carpeta 'dist')
RUN npm run build

# Etapa 2: Servidor (Production Stage)
FROM nginx:alpine

# Limpiamos el contenido por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiamos los archivos compilados de la etapa anterior.
# Dado que tu vite.config.ts usa base: "/portfolio/", copiamos los archivos
# dentro de una carpeta "portfolio" en el directorio raíz de Nginx.
COPY --from=builder /app/dist /usr/share/nginx/html/portfolio

# Exponemos el puerto 80 (el puerto por defecto de Nginx)
EXPOSE 80

# Iniciamos Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
