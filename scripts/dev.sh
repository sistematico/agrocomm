#!/usr/bin/env bash

TMUX_SESSION="agrocomm"
bash "$(dirname "$0")/podman/init.sh"

function tmux_session() {
  if ! \tmux has-session -t $TMUX_SESSION 2> /dev/null; then
    \tmux new-session -A -d -s $TMUX_SESSION -n main

    \tmux new-window -t $TMUX_SESSION -n dev -d
    \tmux send-keys -t $TMUX_SESSION:dev "bun install && bun run db:push && bun run db:seed && bun run db:scrape && bun run dev" ENTER

    \tmux new-window -t $TMUX_SESSION -n studio -d
    \tmux send-keys -t $TMUX_SESSION:studio "bun run db:studio" ENTER

    \tmux new-window -t $TMUX_SESSION -n production -d
    \tmux send-keys -t $TMUX_SESSION:production "ssh nginx@tyche ; cd /var/www/agrocomm" ENTER
  else 
    \tmux attach -t $TMUX_SESSION
  fi
}

# if [ "$OSTYPE" == linux* ]; then
if [[ $OSTYPE =~ "linux"* ]]; then
  tmux_session
  # pgrep -x code >/dev/null || code .
fi