FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @angular/cli@18.2.7 && npm install

COPY . .

RUN ng build

FROM nginx:alpine
COPY --from=0 /usr/src/app/dist/payment-app-frontend/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
