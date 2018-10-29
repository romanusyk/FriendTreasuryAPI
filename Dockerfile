FROM maven:3.3-jdk-8
WORKDIR /app
COPY . /app
CMD ["/bin/sh", "run.sh"]
