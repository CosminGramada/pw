FROM node:14.8.0-alpine

WORKDIR /src

COPY package.json /src
RUN npm install

COPY . /src

CMD npm run test:api
