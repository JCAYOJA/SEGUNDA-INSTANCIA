import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',

    info: {
      title: 'TaskFlow API',
      version: '1.0.0',
      description: 'API para gestión de tareas',
    },

    servers: [
      {
        url: 'https://onrender.com',
        description: 'Servidor de Producción (Render)'
      },
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local'
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },

  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
