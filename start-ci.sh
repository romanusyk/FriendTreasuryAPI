PID_FILE=ci.pid

bash ci.sh >> ci.log 2>&1 &
echo $! > $PID_FILE
