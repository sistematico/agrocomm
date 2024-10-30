#!/bin/bash

if [ -f /etc/arch-release ]; then
  ansible-playbook -e "ansible_port=2200" /home/lucas/code/agrocomm/ansible/main.yml -i eris.paxa.dev,
else
  ansible-playbook --connection=local -e "ansible_port=2200" /var/www/agrocomm/ansible/main.yml -i localhost,
fi