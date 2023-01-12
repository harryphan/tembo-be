FROM node:19-alpine

WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn install
COPY . /app

EXPOSE 8080
EXPOSE 9229
