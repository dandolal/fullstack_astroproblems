 FROM node:alpine3.11

ARG BASE_URL
ENV REACT_APP_BASE_URL=http://localhost:8001

ARG PORT
ENV PORT=$PORT

RUN mkdir -p /app

WORKDIR /app

COPY ./ ./

EXPOSE $PORT

CMD [ "npm", "start" ]
