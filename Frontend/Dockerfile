# ---------- STEP 1: Build React ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---------- STEP 2: Serve using Nginx ----------
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
# If using CRA, replace dist with build

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
