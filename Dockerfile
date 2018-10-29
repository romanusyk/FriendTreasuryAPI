FROM maven:3.3-jdk-8
# VOLUME /tmp
# ARG JAR_FILE
# COPY ${JAR_FILE} app.jar
WORKDIR /app
COPY . /app
CMD ["/bin/sh", "run.sh"]
# RUN ls
# RUN chmod +x run.sh
# RUN ./run.sh
# ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]

