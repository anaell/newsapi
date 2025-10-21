// swagger.js
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "News API",
    version: "1.0.0",
    description: "API for fetching news (trending, latest, live, search, etc.)",
  },
  servers: [
    {
      url: "https://newsapi-w6iw.onrender.com/",
      description: "Development server",
    },
  ],
};

// Options for swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Path to your route files with JSDoc
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec, swaggerUi };
