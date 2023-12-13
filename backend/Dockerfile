FROM node:16.13.1-alpine3.14

WORKDIR /home/node/app

COPY package.json ./

COPY . .

RUN npm install

CMD npm run dev