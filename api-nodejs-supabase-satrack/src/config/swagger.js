const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

// Configuración de Swagger
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API RESTful con Express y Supabase',
      version: '1.0.0',
      description: 'Documentación de la API RESTful utilizando Swagger',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor local',
      },
    ],
  },
  apis: [path.join(__dirname, '../routes/*.js')], 
});

module.exports = {
  swaggerUi,
  swaggerSpec
};
