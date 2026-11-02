const { app } = require("@azure/functions");

// Becomes GET /api/hello on Azure Static Web Apps
app.http("hello", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "hello",
  handler: async (request, context) => {
    context.log("hello function called");
    return {
      jsonBody: {
        message: "Hello from the Azure Functions API",
        time: new Date().toISOString(),
        // Server-side variable: set in portal -> Settings -> Environment variables
        greeting: process.env.GREETING || "GREETING not set",
      },
    };
  },
});
