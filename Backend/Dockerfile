FROM node:14

RUN mkdir -p /app

# Create app directory
WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

CMD [ "node", "app.js" ]
