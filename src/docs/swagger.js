const swaggerJsdoc = require('swagger-jsdoc');

const opcoes = { 
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ordnas Store Api',
            version: '1.0.0',
            description: ' Documentação da API da Ordnas Store'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor Local'
            }
        ]
    },
    apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(opcoes);

module.exports = swaggerSpec