const http = require("http");

const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

// Checks if a PORT is specified in the environment or defaults to 8000
const PORT = process.env.PORT || 8000;

// This way to start a server will allow us to organize our code
// by separating the server functionality from our express code.
// our express code will be in app.js
const server = http.createServer(app);

async function startServer() {
  await loadPlanetsData(); // load async data before exporting module.

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
