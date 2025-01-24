
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run format

RUN npm run lint

RUN npm run build:prod

FROM nginx:1.23

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/auth-frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]