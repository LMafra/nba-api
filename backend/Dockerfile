FROM node:16-alpine

WORKDIR /backend

COPY package.json ./
RUN npm install && npm cache clean --force
ENV PATH=/usr/local/myapp/node_modules/.bin:$PATH

COPY tsconfig.json ./

COPY src ./src

EXPOSE 3000

COPY . .
CMD [ "npm", "run", "dev", "--legacy-watch" ]
