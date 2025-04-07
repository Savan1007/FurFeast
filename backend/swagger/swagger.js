const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const fs = require("fs");

// Load all schemas dynamically
const schemas = {};
const schemasDir = path.join(__dirname, 'schemas');
fs.readdirSync(schemasDir).forEach(file => {
  Object.assign(schemas, require(path.join(schemasDir, file)));
});

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WhiskerBytes API",
      version: "1.0.0",
      description: "API documentation for the WhiskerBytes platform",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "Local server",
      },
    ],
    components: {
      schemas: schemas,
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer"
        }
      }
    }
  },
  apis: [path.join(__dirname, 'paths', '*.js')], // Point to documentation files
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use("/api-docs", 
    swaggerUi.serve, 
    swaggerUi.setup(swaggerSpec, { explorer: true })
  );
}

module.exports = setupSwagger;