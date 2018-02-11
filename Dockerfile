FROM node:7
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build
CMD node dist/server/app.js
EXPOSE 4000
