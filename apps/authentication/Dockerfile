FROM node:22.21.1-alpine3.21

RUN addgroup app && adduser -S -G app app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000 
CMD [ "npm","run", "start:gateway" ]
