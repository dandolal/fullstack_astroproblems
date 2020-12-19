FROM openjdk:11

RUN mkdir -p /app

WORKDIR /app

COPY ./target/astro-problems-0.0.1.jar ./app.jar

EXPOSE $PORT

CMD [ "java", "-jar", "./app.jar" ]
