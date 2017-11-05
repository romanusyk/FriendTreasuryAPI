PID_FILE=server.pid
PID=`cat $PID_FILE`

kill $PID

mvn package -DskipTests
java -jar -Dspring.profiles.active=prod target/*.jar &
echo $! > $PID_FILE

