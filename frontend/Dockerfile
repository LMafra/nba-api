FROM node:10.16.0-alpine
#By default create-react-app sets port to 3000 when you start react app, but I configured to run ui on 8080 (just personal preference) instead of 3000.
EXPOSE 8080
RUN mkdir -p /public /src
WORKDIR /
COPY tsconfig.json /tsconfig.json
COPY package.json /package.json
COPY package-lock.json /package-lock.json
## install only the packages defined in the package-lock.json (faster than the normal npm install)
RUN npm install
# Run 'npm run dev' when the container starts.
CMD ["npm", "start"]
