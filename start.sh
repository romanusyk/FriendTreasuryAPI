export DATABASE_URL=postgres://romm:romm@localhost:5432/ft
mvn package -DskipTests
java -jar target/dependency/jetty-runner.jar target/*.war