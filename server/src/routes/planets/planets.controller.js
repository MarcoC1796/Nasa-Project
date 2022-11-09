const planets = require("../../models/planets.model");

function getAllPlanets(req, res) {
  return res.status(200).json(planets); // status code amd return optional, but keeping them for clarity
}

module.exports = {
  getAllPlanets,
};
