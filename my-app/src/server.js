const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerTest.json');
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('../db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running');
});
