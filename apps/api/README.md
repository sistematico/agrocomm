# AgroComm API

<p align="center">
  <img src="../../assets/logo.svg" alt="AgroComm" width="320" />
</p>

<p style="text-align: center;">
  <i>Commodities agropecuárias de um jeito simples, rápido e confiável.</i>
</p>

## Endpoints

### Autenticação

| Método | Endpoint | Exemplo |
| ----------- | ----------- | ----------- | 
| POST | /auth/register | http://localhost:4000/auth/register |
| POST | /auth/login | http://localhost:4000/auth/login |
| POST | /auth/refresh | http://localhost:4000/auth/refresh |
| POST | /auth/revoke | http://localhost:4000/auth/revoke |

## Estrutura de diretórios

```
/src
  /controllers  // Controllers
  /models       // Models
  /routes       // Rotas
  /services     // Lógica de negócios
  /index.ts     // Entrypoint principal
```

## Desenvolvimento

### Instalação

Para instalar as dependências:
```sh
bun install
```

Para rodar em modo de desenvolvimento:
```sh
bun run dev
```

### Teste

Abra http://localhost:4000

## Produção

### Instalação

Para instalar as dependências:
```sh
bun install
```

### Unidades SystemD

`/etc/systemd/system/agrocomm-hono.service`
```ini
[Unit]
Description=Hono api.agrocomm.com.br
After=network.target

[Service]
User=nginx
WorkingDirectory=/var/www/agrocomm
ExecStart=/home/nginx/.bun/bin/bun /var/www/agrocomm/apps/api/src/index.ts
Restart=always
RestartSec=5s

[Install]
WantedBy=multi-user.target
``` 

`/etc/systemd/system/agrocomm-scrape.service`
```ini
[Unit]
Description=AgroComm Scrape Service

[Service]
Type=oneshot
User=nginx
WorkingDirectory=/var/www/agrocomm
ExecStart=/home/nginx/.bun/bin/bun run /var/www/agrocomm/apps/api/src/services/scrape.services.ts

[Install]
WantedBy=multi-user.target
``` 

`/etc/systemd/system/agrocomm-scrape.timer`
```ini
[Unit]
Description=AgroComm Scrape Timer

[Timer]
OnCalendar=*-*-* 6,12,18,0:00:00
OnCalendar=Mon..Fri
#StartupDelaySec=1min

[Install]
WantedBy=timers.target
``` 

Recarregue as unidades do SystemD:
```
sudo systemctl daemon-reload
```

Habilite e inicie as unidades:
```
sudo systemctl --now enable agrocomm-hono.service agrocomm-scrape.service agrocomm-scrape.timer
```


