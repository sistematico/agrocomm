#!/bin/sh

NAME="agrocomm"
CONTAINER="${NAME}_postgres"
SCRIPT_PATH="$(dirname "$(realpath "$0")")"
PROJECT_PATH="$(dirname $SCRIPT_PATH)"
VISUAL="${VISUAL:-code}"
BROWSER="${BROWSER:-firefox}"

p_flag=false
t_flag=false
b_flag=false

set_flag() {
    case $1 in
        p)
            p_flag=true
            ;;
        t)
            t_flag=true
            ;;
        b)
            b_flag=true
            ;;
        *)
            echo "Opção desconhecida: -$1"
            ;;
    esac
}

for arg in "$@"
do
    if [[ $arg == -* ]]; then
        for (( i=1; i<${#arg}; i++ )); do
            set_flag "${arg:$i:1}"
        done
    fi
done

if [ "$p_flag" = true ] || [ "$#" -eq 0 ]; then
    if podman inspect "$CONTAINER" > /dev/null 2> /dev/null; then
        if podman container inspect -f '{{.State.Running}}' $CONTAINER | grep false; then
            podman start $CONTAINER
        fi
    fi
fi

if [ "$t_flag" = true ] || [ "$#" -eq 0 ]; then
    if ! tmux has-session -t agrocomm 2> /dev/null; then
        \tmux -f ${PROJECT_PATH}/scripts/.tmux.conf new-session -A -d -s $NAME -n project
        \tmux send-keys -t $NAME:project "cd ${PROJECT_PATH} ; clear" ENTER

        \tmux new-window -t $NAME -n client -d
        \tmux send-keys -t $NAME:client "clear ; cd ${PROJECT_PATH}/apps/site ; bun run dev" ENTER

        \tmux new-window -t $NAME -n server -d
        \tmux send-keys -t $NAME:server "clear ; cd ${PROJECT_PATH}/apps/api ; bun run dev" ENTER

        \tmux new-window -t $NAME -n studio -d
        \tmux send-keys -t $NAME:studio "clear ; cd ${PROJECT_PATH}/apps/api ; bunx prisma studio" ENTER
    fi
fi

if [ "$b_flag" = true ] || [ "$#" -eq 0 ]; then
    $BROWSER 'https://bun.sh' 'https://chat.openai.com' 'https://github.com/sistematico/agrocomm' 'http://localhost:5173' &
fi

$VISUAL ${PROJECT_PATH}
