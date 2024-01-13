#!/bin/bash

[ $EUID != 0 ] && exit

cp -f files/agrocomm-hono.service /etc/systemd/system/
cp -f files/agrocomm-hono /etc/sudoers.d/

systemctl daemon-reload 
systemctl enable agrocomm-hono
systemctl restart agrocomm-hono