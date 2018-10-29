FROM tiangolo/node-frontend:10 as build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build:prod

FROM nginx:1.15
COPY --from=build /app/dist/out/ /usr/share/nginx/html
COPY --from=build /nginx-webserver.config /etc/nginx/conf.d/default.conf
