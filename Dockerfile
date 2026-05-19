FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY LOGOGEST.jpg /usr/share/nginx/html/LOGOGEST.jpg
EXPOSE 80
