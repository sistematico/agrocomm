# AgroComm

## Instalação da API

### Unidade Systemd da API em Node.js

/etc/systemd/system/node.service
```
[Unit]
Description=Node.js App Systemd Unit
Documentation=https://example.com
After=network.target

[Service]
Environment=NODE_ENV=production
Type=simple
User=caddy
ExecStart=/usr/bin/node /var/www/agrocomm.somdomato.com/api/app.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```


## Instalação do Front-End em Vue.js


### Configuração do Nginx

```
server {
    listen 80;
    server_name 10.0.0.161;
    return 301 https://site.com$request_uri;
}

server {
    listen 80; # default_server
    listen [::]:80; # default_server
    server_name *.site.com site.com;
    return 301 https://site.com$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;

    ssl_certificate         /etc/letsencrypt/live/site.com/fullchain.pem;
    ssl_certificate_key     /etc/letsencrypt/live/site.com/privkey.pem;

    server_name www.site.com;
    return 301 https://site.com$request_uri;
}

server {
    listen 443 ssl; # default_server
    listen [::]:443 ssl; # default_server

    ssl_certificate         /etc/letsencrypt/live/site.com/fullchain.pem;
    ssl_certificate_key     /etc/letsencrypt/live/site.com/privkey.pem;

    server_name site.com;
    root /var/www/site.com/dist;
    index index.html;

    error_page 404 403 500 503 /index.html;

    location / {
        #try_files $uri $uri/ =404;
        try_files $uri $uri/ /index.html;
    }

    location ~ /\.ht { deny all; }
}
```

### Configuração do CaddyServer

```
site.com {
        handle /api* {
                reverse_proxy localhost:3000
        }

        handle {
                root * /var/www/site.com/dist
                try_files {path} /index.html
                file_server
        }
}
```