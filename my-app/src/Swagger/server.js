const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swaggerTest.json');
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('../../db.json');
const middlewares = jsonServer.defaults();
const key = "Bearer geronimo"

const validateApiKey = (req, res, next) => {
  const apiKey = req.get('Authorization');
  if (!apiKey || apiKey !== key) {
    return res.status(401).json({ message: 'Invalid API key' });
  }
  next();
};

server.use(middlewares);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use(validateApiKey); // Add custom middleware function here
server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running');
});
