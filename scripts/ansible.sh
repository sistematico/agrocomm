#!/bin/bash

if [ -f /etc/arch-release ]; then
  ansible-playbook -e "ansible_port=2200" /home/lucas/code/agrocomm/ansible/playbook.yml -i eris.paxa.dev,
else
  # ansible-playbook --connection=local ./ansible/playbook.yml -i 127.0.0.1,
  ansible-playbook --connection=local -e "ansible_port=2200" /var/www/agrocomm/ansible/playbook.yml -i localhost,
fi