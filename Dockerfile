FROM maven:3.3-jdk-8 as build

WORKDIR /app

COPY . .

RUN mvn package -DskipTests

FROM openjdk

WORKDIR /app

COPY --from=build app/target/*.jar app.jar

CMD ["java", "-jar", "app.jar"]
