FROM nginx:1.21.6
COPY /build /usr/share/nginx/html
COPY /build/lobstr/index.html /usr/share/nginx/html/lobstr.html
COPY /subdomains/ /usr/share/nginx/html/subdomains/
COPY /version.htm /usr/share/nginx/html
COPY /default.conf /etc/nginx/conf.d
COPY /nginx.conf /etc/nginx/nginx.conf
COPY /lobstr.conf /etc/nginx/conf.d
COPY /app.conf /etc/nginx/conf.d/app.conf
COPY /tangem-beta.apk /usr/share/nginx/html
