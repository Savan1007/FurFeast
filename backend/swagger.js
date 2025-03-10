const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
  },
  components: {
    schemas: {
      Recipient: {
        type: "object",
        required: ["name", "phone", "email", "address", "recipient_type"],
        properties: {
          id: {type: "integer",readOnly: true},
          name: {type: "string",example: "City Homeless Shelter"},
          contact_person: {type: "string", nullable: true},
          phone: {type: "string",example: "+1-555-123-4567"},
          email: {type: "string",format: "email"},
          address: {type: "string"},
          recipient_type: {type: "string",enum: ["shelter", "foster", "organization"]},
          notes: {type: "string",nullable: true},
          createdAt: {type: "string",format: "date-time",readOnly: true},
          updatedAt: {type: "string",format: "date-time",readOnly: true}
        }
      }
    }
  },

  apis: ["./routes/*.js"], 
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true })); 
}

module.exports = setupSwagger;
